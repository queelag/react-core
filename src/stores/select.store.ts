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
    let value: any

    switch (this.mode) {
      case SelectMode.MULTIPLE:
        value = this.value as SelectOptionValue[]
        this.store[this.path] = value.includes(option.value) ? value.filter((v: SelectOptionValue) => v !== option.value) : value.concat(option.value)
        break
      case SelectMode.SINGLE:
        this.store[this.path] = option.value as any
        break
    }

    this.touched = true
    this.validation = this.schema.validate(this.value)

    this.resetQuery()
  }

  /**
   * Removes an option from store[path] if the mode is MULTIPLE.
   */
  onClickRemove = (option: SelectOption): void => {
    this.onClickOption(option)
  }

  onChangeQuery = (event: ChangeEvent<HTMLInputElement>): void => {
    this.query = event.target.value
    Logger.debug(this.id, 'onChangeQuery', `The query value has been set to ${this.query}.`)

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
    this.resetValue()
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
        break
      case SelectMode.SINGLE:
        this.store[this.path] = this.dummyOption as any
        break
    }

    Logger.debug(this.id, 'resetValue', `The value has been reset.`)
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

/** @category Constant */
export const SELECT_STORE_KEYS: (keyof SelectProps<any> & keyof SelectStore<any>)[] = ['id', 'label', 'layer', 'mode', 'options', 'path', 'required', 'store']
