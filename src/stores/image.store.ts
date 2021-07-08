import { ID, Logger, noop, rv, tc, tcp } from '@queelag/core'
import { Buffer } from 'buffer'
import { ComponentName, Shape } from '../definitions/enums'
import { ImageProps } from '../definitions/props'
import { Cache } from '../modules/cache'
import { ComponentShapeStore } from '../modules/component.shape.store'

export class ImageStore extends ComponentShapeStore<HTMLImageElement> {
  base64: string
  error: boolean
  type: string

  private _source: string

  constructor(id: ID = '', shape: Shape = Shape.NONE, source: string, update: () => void = noop) {
    super(ComponentName.IMAGE, id, undefined, shape, update)

    this.base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    this.error = false
    this.type = 'image/png'
    this.source = source

    this._source = this.toBase64Source(this.base64, this.type)
  }

  onError = (error?: React.SyntheticEvent<HTMLImageElement>): void => {
    this.error = true
    Logger.error(this.id, 'onError', `The error has been set to true.`, error)

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

  set source(source: string) {
    console.log('SOURCE', source, /^(https?:\/\/|\/)/.test(source))
    ;(async () => {
      switch (true) {
        case /^(https?:\/\/|\/)/.test(source):
          let cached: string | undefined, response: Response | Error, buffer: ArrayBuffer | Error, base64: string | Error, type: string | null

          console.log('SOURCE', source)

          cached = Cache.images.get(source)
          if (cached) return (this.source = cached)

          response = await tcp(() => window.fetch(source))
          if (response instanceof Error) return this.onError()

          buffer = await tcp(() => (response as Response).arrayBuffer())
          if (buffer instanceof Error) return this.onError()

          base64 = tc(() => Buffer.from(buffer as ArrayBuffer).toString('base64'))
          if (base64 instanceof Error) return this.onError()

          type = response.headers.get('content-type')
          if (!type) return rv(() => Logger.error(this.id, 'setSource', `Failed to find the content-type header`, (response as Response).headers))

          this.base64 = base64
          this._source = this.toBase64Source(base64, type)
          this.type = type

          Cache.images.set(source, this.toBase64Source(base64, type))

          break
        case source.includes('base64'):
        default:
          this._source = source

          break
      }

      this.update()
    })()
  }
}

export const IMAGE_STORE_KEYS: (keyof ImageProps & keyof ImageStore)[] = ['id', 'shape', 'source']
