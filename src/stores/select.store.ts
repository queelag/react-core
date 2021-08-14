import { Logger } from '@queelag/core'
import { ChangeEvent } from 'react'
import * as S from 'superstruct'
import { ComponentName, SelectMode } from '../definitions/enums'
import { SelectOption } from '../definitions/interfaces'
import { SelectOptionValue } from '../definitions/types'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { SelectProps } from '../definitions/with.superstruct.props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for Select stores, handles SINGLE and MULTIPLE modes.
 *
 * @category Store
 */
export class SelectStore<T extends object> extends ComponentFormFieldStore<HTMLDivElement, T> {
  /**
   * A {@link SelectMode} which determines how the internal logic behaves.
   */
  mode: SelectMode
  /**
   * An array of {@link SelectOption}.
   */
  options: SelectOption[]
  /**
   * A string value to filter the options.
   */
  query: string

  constructor(props: SelectProps<T> & ComponentFormFieldStoreProps<HTMLDivElement, T>) {
    super(ComponentName.SELECT, props)

    this.mode = props.mode || SelectMode.SINGLE
    this.options = props.options
    this.query = ''
  }

  /**
   * Sets the option value to store[path] if the mode is SINGLE otherwise pushes or removes it if the mode is MULTIPLE.
   */
  onClickOption = (option: SelectOption): void => {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        if (this.valueAsMultiple.includes(option.value)) {
          this.store[this.path] = this.valueAsMultiple.filter((v: SelectOptionValue) => v !== option.value) as any
          Logger.debug(this.id, 'onClickOption', this.mode, `The option ${option.value} has been removed from the value.`, this.value, option)

          break
        }

        this.store[this.path] = this.valueAsMultiple.concat(option.value) as any
        Logger.debug(this.id, 'onClickOption', this.mode, `The option ${option.value} has been pushed to the value.`, this.value, option)

        break
      case SelectMode.SINGLE:
        this.store[this.path] = option.value as any
        Logger.debug(this.id, 'onClickOption', this.mode, `The option ${option.value} has been set as the value.`, this.value)

        break
    }

    this.touch()
    this.resetQuery()
  }

  /**
   * Removes an option from store[path] if the mode is MULTIPLE.
   */
  onClickRemove = (option: SelectOption): void => {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        if (this.valueAsMultiple.includes(option.value)) {
          this.store[this.path] = this.valueAsMultiple.filter((v: SelectOptionValue) => v !== option.value) as any
          Logger.debug(this.id, 'onClickRemove', this.mode, `The option ${option.value} has been removed from the value.`, this.value, option)
        }

        break
      case SelectMode.SINGLE:
        Logger.warn(this.id, 'onClickRemove', this.mode, `The remove function does not work with this mode.`)
        break
    }
  }

  onChangeQuery = (event: ChangeEvent<HTMLInputElement>): void => {
    this.query = event.target.value
    Logger.debug(this.id, 'onChangeQuery', `The query has been set to ${this.query}.`)

    if (this.query.length <= 0) {
      this.resetValue()
    }

    this.update()
  }

  onCollapse = (): void => {
    this.resetQuery()
  }

  onEscape = (): void => {
    this.resetQuery()
    // this.resetValue()
  }

  resetQuery(): void {
    this.query = ''
    Logger.debug(this.id, 'resetQuery', `The query has been reset.`)

    this.update()
  }

  resetValue(): void {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        this.store[this.path] = [] as any
        Logger.debug(this.id, 'resetValue', this.mode, `The value has been set to an empty array.`)

        break
      case SelectMode.SINGLE:
        this.store[this.path] = '' as any
        Logger.debug(this.id, 'resetValue', this.mode, `The value has been set to an empty string.`)

        break
    }
  }

  findLabelByValue(value: SelectOptionValue): string {
    return (this.options.find((v: SelectOption) => v.value === value) || { label: '', value: '' }).label
  }

  get optionsFilteredByQuery(): SelectOption[] {
    return this.options.filter(
      (v: SelectOption) =>
        v.label.toLowerCase().trim().includes(this.query.toLowerCase().trim()) || v.value.toLowerCase().trim().includes(this.query.toLowerCase().trim())
    )
  }

  /**
   * A custom schema based on the mode.
   */
  get schema(): S.Struct<SelectOptionValue> | S.Struct<SelectOptionValue[]> {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        return this.required ? S.size(S.array(S.string()), 1, Infinity) : S.array(S.string())
      case SelectMode.SINGLE:
        return this.required ? S.size(S.string(), 1, Infinity) : S.string()
      default:
        return S.any()
    }
  }

  /**
   * A value read from store[path].
   */
  get value(): SelectOptionValue | SelectOptionValue[] {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        return (this.store[this.path] as any) || []
      case SelectMode.SINGLE:
        return (this.store[this.path] as any) || ''
    }
  }

  get valueAsMultiple(): SelectOptionValue[] {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        return []
      case SelectMode.SINGLE:
        return this.value as SelectOptionValue[]
    }
  }

  get valueAsSingle(): SelectOptionValue {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        return ''
      case SelectMode.SINGLE:
        return this.value as SelectOptionValue
    }
  }

  get isModeMultiple(): boolean {
    return this.mode === SelectMode.MULTIPLE
  }

  get isModeSingle(): boolean {
    return this.mode === SelectMode.SINGLE
  }

  private get dummyOption(): SelectOption {
    return { label: '', value: '' }
  }

  /** @internal */
  set schema(schema: S.Struct<SelectOptionValue> | S.Struct<SelectOptionValue[]>) {
    this._schema = schema
  }
}
