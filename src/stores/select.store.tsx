import { ID, noop } from '@queelag/core'
import Joi, { AnySchema } from 'joi'
import { MutableRefObject } from 'react'
import { ComponentName, Layer, SelectMode } from '../definitions/enums'
import { SelectProps } from '../definitions/props'
import { SelectOption } from '../definitions/types'
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
    super(ComponentName.SELECT, id, label, layer, path, ref, required, Joi.any(), store, touched, update)

    this.mode = mode
    this.options = options
  }

  onClickOption = (option: SelectOption): void => {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        this.store[this.path] = this.value.includes(option.value) ? this.value.filter((v: any) => v !== option.value) : (this.value.concat(option.value) as any)
        break
      case SelectMode.SINGLE:
        this.store[this.path] = option.value as any
        break
    }

    this.touched = true
    this.validation = this.schema.validate(this.value)
  }

  onClickRemove = (value: any): any => {
    this.onClickOption(value)
  }

  findLabelByValue(value: any): string {
    return (this.options.find((v: SelectOption) => v.value === value) || { label: '', value: '' }).label
  }

  get schema(): AnySchema {
    switch (this.mode) {
      case SelectMode.MULTIPLE:
        return this.required ? Joi.array().min(1).required() : Joi.array()
      case SelectMode.SINGLE:
        return this.required ? Joi.any().required() : Joi.any()
    }
  }

  get value(): any {
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

  set schema(schema: AnySchema) {
    this._schema = schema
  }
}

export const SELECT_STORE_KEYS: (keyof SelectProps<any> & keyof SelectStore<any>)[] = ['id', 'label', 'layer', 'mode', 'options', 'path', 'required', 'store']
