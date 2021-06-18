import { ID, Localization, ObjectUtils } from '@queelag/core'
import Joi, { AnySchema, ValidationResult } from 'joi'
import { makeObservable, observable } from 'mobx'
import { MutableRefObject } from 'react'
import { Layer } from '../definitions/enums'
import { ComponentLayerStore } from './component.layer.store'
import { Dummy } from './dummy'

export class ComponentFormFieldStore<T extends Element, U extends object> extends ComponentLayerStore<T> {
  label: string
  path: keyof U
  required: boolean
  _schema: AnySchema
  store: U
  touched: boolean
  validation: ValidationResult

  constructor(
    name: string,
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.ZERO,
    path: keyof U,
    ref: MutableRefObject<T> = Dummy.ref,
    required: boolean = false,
    _schema: AnySchema = Joi.any(),
    store: U,
    touched: boolean = false,
    update?: () => void
  ) {
    super(name, id, layer, ref, update)

    this.label = label
    this.path = path
    this.required = required
    this._schema = _schema
    this.store = store
    this.touched = touched
    this.validation = _schema.validate(this.value)

    makeObservable(this, { touched: observable, validation: observable })
  }

  touch(): void {
    this.touched = true
    this.validation = this.schema.validate(this.value)
  }

  get error(): string {
    return this.validation.error ? this.validation.error.message.replace(/"[a-z]+"/, `"${Localization.get(this.label)}"`) : ''
  }

  get schema(): AnySchema {
    return this._schema
  }

  get value(): any {
    return ObjectUtils.get(this.store, this.path)
  }

  get hasBeenTouched(): boolean {
    return this.touched === true
  }

  get hasError(): boolean {
    return this.validation.error !== undefined
  }

  get isErrorVisible(): boolean {
    return this.hasBeenTouched && this.hasError
  }

  get isValid(): boolean {
    return this.validation.error === undefined
  }

  set schema(value: AnySchema) {
    this._schema = value
  }
}
