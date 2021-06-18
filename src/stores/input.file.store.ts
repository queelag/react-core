import { ID, IDUtils, noop, tcp } from '@queelag/core'
import { Buffer } from 'buffer'
import Joi, { ArraySchema, ObjectSchema } from 'joi'
import { ChangeEvent, MutableRefObject } from 'react'
import { ComponentName, InputFileMode, Layer } from '../definitions/enums'
import { InputFileItem } from '../definitions/types'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'
import { Schema } from '../modules/schema'

export class InputFileStore<T extends object> extends ComponentFormFieldStore<HTMLInputElement, T> {
  mode: InputFileMode

  constructor(
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.ZERO,
    mode: InputFileMode = InputFileMode.SINGLE,
    path: keyof T = '' as any,
    ref: MutableRefObject<HTMLInputElement> = Dummy.ref,
    required: boolean = false,
    store: T = {} as any,
    touched: boolean = false,
    update: () => void = noop
  ) {
    super(ComponentName.INPUT_FILE, id, label, layer, path, ref, required, Joi.any(), store, touched, update)

    this.mode = mode
    this.validation = this.schema.validate(this.value)
  }

  onChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        let buffers: ArrayBuffer[] | Error, items: InputFileItem[]

        buffers = await tcp(async () => {
          buffers = []

          for (let i = 0; i < (event.target.files?.length || 0); i++) {
            buffers.push(await (event.target.files?.item(i) as File).arrayBuffer())
          }

          return buffers
        })
        if (buffers instanceof Error) return

        items = buffers.reduce((r: InputFileItem[], v: ArrayBuffer, k: number) => {
          let item: InputFileItem

          item = Dummy.inputFileItem
          item.data = Buffer.from(v).toString('base64')
          item.id = IDUtils.unique(r.map((v: InputFileItem) => v.id))
          item.name = event.target.files ? event.target.files[k].name : ''

          return [...r, item]
        }, [])

        this.store[this.path] = items as any

        break
      case InputFileMode.SINGLE:
        let buffer: ArrayBuffer | Error, item: InputFileItem

        buffer = await tcp(async () => (event.target.files ? event.target.files[0].arrayBuffer() : new ArrayBuffer(0)))
        if (buffer instanceof Error) return

        item = Dummy.inputFileItem
        item.data = Buffer.from(buffer).toString('base64')
        item.id = IDUtils.unique()
        item.name = event.target.files ? event.target.files[0].name : ''

        this.store[this.path] = item as any

        break
    }

    this.touched = true
    this.validation = this.schema.validate(this.value)
  }

  onRemove = async (item: InputFileItem): Promise<void> => {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        this.store[this.path] = (this.value as InputFileItem[]).filter((v: InputFileItem) => v.id != item.id) as any
        break
      case InputFileMode.SINGLE:
        this.store[this.path] = Dummy.inputFileItem as any
        break
    }

    this.validation = this.schema.validate(this.value)
  }

  get files(): InputFileItem[] {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        return this.value as InputFileItem[]
      case InputFileMode.SINGLE:
        return (this.value as InputFileItem).id.length > 0 ? [this.value as InputFileItem] : []
    }
  }

  get schema(): ArraySchema | ObjectSchema {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        return Joi.array().items(this.required ? Schema.inputFileItemRequired : Schema.inputFileItemOptional)
      case InputFileMode.SINGLE:
        return this.required ? Schema.inputFileItemRequired : Schema.inputFileItemOptional
    }
  }

  get value(): InputFileItem | InputFileItem[] {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        return (this.store[this.path] as any) || []
      case InputFileMode.SINGLE:
        return (this.store[this.path] as any) || Dummy.inputFileItem
    }
  }

  get isFilesEmpty(): boolean {
    return this.files.length <= 0
  }

  get isFilesNotEmpty(): boolean {
    return this.files.length > 0
  }

  get isModeMultiple(): boolean {
    return this.mode === InputFileMode.MULTIPLE
  }

  get isModeSingle(): boolean {
    return this.mode === InputFileMode.SINGLE
  }
}
