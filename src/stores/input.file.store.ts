import { Base64, IDUtils, Logger } from '@queelag/core'
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

    this.validate()
  }

  /**
   * Updates store[path] with an {@link InputFileItem} if the mode is SINGLE otherwise updates it with an array of them.
   */
  onChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        let files: File[], items: InputFileItem[]

        files = [...(event.target.files || [])]
        if (files.length <= 0) return Logger.error(this.id, 'onChange', `Failed to find any file.`, event.target.files)

        items = []
        await Promise.all(
          files.map(async (v: File, k: number) => {
            let item: InputFileItem

            item = Dummy.inputFileItem
            item.buffer = await v.arrayBuffer()
            item.base64 = Base64.encode(item.buffer)
            item.id = IDUtils.unique(items.map((v: InputFileItem) => v.id))
            item.name = v.name
            item.size = v.size
            item.timestamp = v.lastModified
            item.type = v.type

            items.push(item)
          })
        )

        this.store[this.path] = items as any
        Logger.debug(this.id, 'onChange', `The items have been set as the value.`, items)

        break
      case InputFileMode.SINGLE:
        let file: File | null, item: InputFileItem

        file = event.target.files && event.target.files[0]
        if (!file) return Logger.error(this.id, 'onChange', `Failed to find the first file.`, event.target.files)

        item = Dummy.inputFileItem
        item.buffer = await file.arrayBuffer()
        item.base64 = Base64.encode(item.buffer)
        item.id = IDUtils.unique()
        item.name = file.name
        item.size = file.size
        item.timestamp = file.lastModified
        item.type = file.type

        this.store[this.path] = item as any
        Logger.debug(this.id, 'onChange', `The item has been set as the value.`, item)

        break
    }

    this.touch()
  }

  /**
   * Resets store[path] if the mode is SINGLE otherwise filters out the item.
   */
  onRemove = (item: InputFileItem): void => {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        this.store[this.path] = (this.value as InputFileItem[]).filter((v: InputFileItem) => v.id != item.id) as any
        Logger.debug(this.id, 'onRemove', `The item ${item.id} has been removed from the value.`, this.value, item)

        break
      case InputFileMode.SINGLE:
        this.store[this.path] = Dummy.inputFileItem as any
        Logger.debug(this.id, 'onRemove', `The value has been reset.`, this.value)

        break
    }

    this.touch()
  }

  /**
   * Resets store[path] if the mode is SINGLE otherwise it empties the array.
   */
  onClear = (): void => {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        this.store[this.path] = [] as any
        Logger.debug(this.id, 'onClear', `The value has been set to an empty array.`, this.value)

        break
      case InputFileMode.SINGLE:
        this.store[this.path] = Dummy.inputFileItem as any
        Logger.debug(this.id, 'onClear', `The value has been reset.`, this.value)

        break
    }

    this.validate()
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
  get schema() {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        return S.size(S.array(this.required ? Schema.inputFileItemRequired : Schema.inputFileItemOptional), 1, Infinity)
      case InputFileMode.SINGLE:
        return this.required ? Schema.inputFileItemRequired : Schema.inputFileItemOptional
      default:
        return S.any()
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
  set schema(schema) {
    this._schema = schema
  }
}
