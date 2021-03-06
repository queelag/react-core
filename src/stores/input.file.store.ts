import { ChangeEvent } from 'react'
import * as S from 'superstruct'
import { ComponentName, InputFileMode } from '../definitions/enums'
import { InputFileItem } from '../definitions/interfaces'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { InputFileProps } from '../definitions/with.superstruct.props'
import { StoreLogger } from '../loggers/store.logger'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'
import { Schema } from '../modules/schema'
import { FileUtils } from '../utils/file.utils'

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
        if (files.length <= 0) return StoreLogger.error(this.id, 'onChange', `Failed to find any file.`, event.target.files)

        items = []
        await Promise.all(files.map(FileUtils.toInputFileItem))

        this.store[this.path] = items as any
        StoreLogger.debug(this.id, 'onChange', `The items have been set as the value.`, items)

        break
      case InputFileMode.SINGLE:
        let file: File | null, item: InputFileItem

        file = event.target.files && event.target.files[0]
        if (!file) return StoreLogger.error(this.id, 'onChange', `Failed to find the first file.`, event.target.files)

        item = await FileUtils.toInputFileItem(file)

        this.store[this.path] = item as any
        StoreLogger.debug(this.id, 'onChange', `The item has been set as the value.`, item)

        break
    }

    this.touch()
  }

  /**
   * Removes an item from store[path] if the mode is MULTIPLE.
   */
  onClickRemoveItem = (item: InputFileItem): void => {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        this.store[this.path] = (this.value as InputFileItem[]).filter((v: InputFileItem) => v.id != item.id) as any
        StoreLogger.debug(this.id, 'onRemove', this.mode, `The item ${item.id} has been removed from the value.`, item, this.value)

        break
      case InputFileMode.SINGLE:
        StoreLogger.warn(this.id, 'onClickRemove', this.mode, `The remove function does not work with this mode.`)
        break
    }

    this.touch()
  }

  /**
   * Resets store[path] if the mode is SINGLE otherwise it empties the array.
   */
  onClear = (): void => {
    this.resetValue()
    this.touch()
  }

  resetValue(): void {
    switch (this.mode) {
      case InputFileMode.MULTIPLE:
        this.store[this.path] = [] as any
        StoreLogger.debug(this.id, 'resetValue', this.mode, `The value has been set to an empty array.`, this.value)

        break
      case InputFileMode.SINGLE:
        this.store[this.path] = Dummy.inputFileItem as any
        StoreLogger.debug(this.id, 'resetValue', this.mode, `The value has been reset.`, this.value)

        break
    }
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
