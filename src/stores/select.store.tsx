import * as S from 'superstruct'
import { ComponentName, SelectMode } from '../definitions/enums'
import { ComponentFormFieldProps, SelectProps } from '../definitions/props'
import { SelectOption, SelectOptionValue } from '../definitions/types'
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

  constructor(props: SelectProps<T> & ComponentFormFieldProps<HTMLDivElement, T>) {
    super(ComponentName.SELECT, props)

    this.mode = props.mode || SelectMode.SINGLE
    this.options = props.options
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
  }

  /**
   * Removes an option from store[path] if the mode is MULTIPLE.
   */
  onClickRemove = (option: SelectOption): void => {
    this.onClickOption(option)
  }

  findLabelByValue(value: SelectOptionValue): string {
    return (this.options.find((v: SelectOption) => v.value === value) || { label: '', value: '' }).label
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
        return this.store[this.path] as any
    }
  }

  get isModeMultiple(): boolean {
    return this.mode === SelectMode.MULTIPLE
  }

  get isModeSingle(): boolean {
    return this.mode === SelectMode.SINGLE
  }

  /** @internal */
  set schema(schema: S.Struct<SelectOptionValue> | S.Struct<SelectOptionValue[]>) {
    this._schema = schema
  }
}

/** @category Constant */
export const SELECT_STORE_KEYS: (keyof SelectProps<any> & keyof SelectStore<any>)[] = ['id', 'label', 'layer', 'mode', 'options', 'path', 'required', 'store']
