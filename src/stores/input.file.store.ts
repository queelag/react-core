import { Base64, IDUtils, tcp } from '@queelag/core'
import { ChangeEvent } from 'react'
import * as S from 'superstruct'
import { ComponentName, InputFileMode } from '../definitions/enums'
import { InputFileItem } from '../definitions/interfaces'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { InputFileProps } from '../definitions/with.superstruct.props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'
import { Schema } from '../modules/schema'

/**
 * An abstraction for InputFile stores, handles SINGLE and MULTIPLE modes.
 *
 * @category Store
 */
export class InputFileStore<T extends object> extends ComponentFormFieldStore<HTMLInputElement, T> {
  /**
   * An {@link InputFileMode} which determines how the internal logic will behave.
   */
  mode: InputFileMode

  constructor(props: InputFileProps<T> & ComponentFormFieldStoreProps<HTMLInputElement, T>) {
    super(ComponentName.INPUT_FILE, props)

    this.mode = props.mode || InputFileMode.SINGLE
    this.validation = this.schema.validate(this.value)
  }

  /**
   * Updates store[path] with an {@link InputFileItem} if the mode is SINGLE otherwise updates it with an array of them.
   */
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
          item.data = Base64.encode(v)
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
        item.data = Base64.encode(buffer)
        item.id = IDUtils.unique()
        item.name = event.target.files ? event.target.files[0].name : ''

        this.store[this.path] = item as any

        break
    }

    this.touched = true
    this.validation = this.schema.validate(this.value)
  }

  /**
   * Resets store[path] if the mode is SINGLE otherwise filters out the item.
   */
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

  /**
   * Returns an array of {@link InputFileItem} from store[path].
   */
  get files(): InputFileItem[] {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        return this.value as InputFileItem[]
      case InputFileMode.SINGLE:
        return (this.value as InputFileItem).id.length > 0 ? [this.value as InputFileItem] : []
    }
  }

  /**
   * A custom schema which validates the value against {@link InputFileItem}.
   */
  get schema(): S.Describe<InputFileItem> | S.Struct<InputFileItem[]> {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        return S.array(this.required ? Schema.inputFileItemRequired : Schema.inputFileItemOptional)
      case InputFileMode.SINGLE:
        return this.required ? Schema.inputFileItemRequired : Schema.inputFileItemOptional
    }
  }

  /**
   * A value read from store[path].
   */
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

  /** @internal */
  set schema(schema: S.Describe<InputFileItem> | S.Struct<InputFileItem[]>) {
    this._schema = schema
  }
}

/** @category Constant */
export const INPUT_FILE_STORE_KEYS: (keyof InputFileProps<any> & keyof InputFileStore<any>)[] = ['id', 'label', 'layer', 'mode', 'path', 'required', 'store']
