import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import * as S from 'superstruct'
import { ComponentName, Layer, SelectMode } from '../definitions/enums'
import { SelectProps } from '../definitions/props'
import { SelectOption, SelectOptionValue } from '../definitions/types'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'

export class SelectStore<T extends object> extends ComponentFormFieldStore<HTMLDivElement, T> {
  mode: SelectMode
  options: SelectOption[]

  constructor(
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.TWO,
    mode: SelectMode = SelectMode.SINGLE,
    options: SelectOption[] = [],
    path: keyof T = '' as any,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    required: boolean = false,
    store: T = {} as any,
    touched: boolean = false,
    update: () => void = noop
  ) {
    super(ComponentName.SELECT, id, label, layer, path, ref, required, Dummy.schema, store, touched, update)

    this.mode = mode
    this.options = options
  }

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

  onClickRemove = (value: SelectOption): void => {
    this.onClickOption(value)
  }

  findLabelByValue(value: SelectOptionValue): string {
    return (this.options.find((v: SelectOption) => v.value === value) || { label: '', value: '' }).label
  }

  get schema(): S.Struct<SelectOptionValue> | S.Struct<SelectOptionValue[]> {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        return this.required ? S.size(S.array(S.string()), 1, Infinity) : S.array(S.string())
      case SelectMode.SINGLE:
        return this.required ? S.size(S.string(), 1, Infinity) : S.string()
    }
  }

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

  set schema(schema: S.Struct<SelectOptionValue> | S.Struct<SelectOptionValue[]>) {
    this._schema = schema
  }
}

export const SELECT_STORE_KEYS: (keyof SelectProps<any> & keyof SelectStore<any>)[] = ['id', 'label', 'layer', 'mode', 'options', 'path', 'required', 'store']
