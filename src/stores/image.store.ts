import { ID, noop, tc, tcp } from '@queelag/core'
import { Buffer } from 'buffer'
import Joi from 'joi'
import { MutableRefObject } from 'react'
import { ComponentName, Shape } from '../definitions/enums'
import Cache from '../modules/cache'
import { ComponentShapeStore } from '../modules/component.shape.store'
import { Schema } from '../modules/schema'

export class ImageStore extends ComponentShapeStore<HTMLImageElement> {
  base64: string
  error: boolean
  type: string

  private _source: string

  constructor(id: ID, ref: MutableRefObject<HTMLImageElement>, shape: Shape = Shape.NONE, source: string, update: () => void = noop) {
    super(ComponentName.IMAGE, id, ref, shape, update)

    this.base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    this.error = false
    this.type = 'image/png'
    this.source = source

    this._source = this.toBase64Source(this.base64, this.type)
  }

  onError = (error: React.SyntheticEvent<HTMLImageElement>) => {
    // console.error(error)
    this.error = true

    this.update()
  }

  toBase64Source(base64: string, type: string): string {
    return 'data:' + type + ';base64,' + base64
  }

  get source(): string {
    return this._source
  }

  get hasError(): boolean {
    return this.error === true
  }

  get hasNoError(): boolean {
    return this.error === false
  }

  set source(value: string) {
    ;(async () => {
      switch (true) {
        case value.includes('base64'):
          this.source = value

          break
        case Schema.isValid(Joi.string().uri({ allowRelative: true }), value):
          let cached: string | undefined, response: Response | Error, buffer: ArrayBuffer | Error, base64: string | Error, type: string | null

          cached = Cache.images.get(value)
          if (cached) return (this._source = cached)

          response = await tcp(() => window.fetch(value))
          if (response instanceof Error) return

          buffer = await tcp(() => (response as Response).arrayBuffer())
          if (buffer instanceof Error) return

          base64 = tc(() => Buffer.from(buffer as ArrayBuffer).toString('base64'))
          if (base64 instanceof Error) return

          type = response.headers.get('content-type')
          if (!type) return

          this.base64 = base64
          this.source = this.toBase64Source(base64, type)
          this.type = type

          Cache.images.set(value, this.toBase64Source(base64, type))

          break
        default:
          this.source = value

          break
      }

      this.update()
    })()
  }
}
