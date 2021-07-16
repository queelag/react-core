import { ID, ObjectUtils } from '@queelag/core'
import { MutableRefObject } from 'react'
import * as S from 'superstruct'
import { Layer } from '../definitions/enums'
import { ComponentLayerStore } from './component.layer.store'
import { Dummy } from './dummy'

/**
 * @category Module
 */
export class ComponentFormFieldStore<T extends Element, U extends object> extends ComponentLayerStore<T> {
  label: string
  path: keyof U
  required: boolean
  protected _schema: S.Struct<any, any> = Dummy.schema
  store: U
  touched: boolean
  validation: [S.StructError | undefined, any]

  constructor(
    name: string,
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.ZERO,
    path: keyof U,
    ref: MutableRefObject<T> = Dummy.ref,
    required: boolean = false,
    schema: S.Struct = Dummy.schema,
    store: U,
    touched: boolean = false,
    update?: () => void
  ) {
    super(name, id, layer, ref, update)

    this.label = label
    this.path = path
    this.required = required
    this.schema = schema
    this.store = store
    this.touched = touched
    this.validation = schema.validate(this.value)
  }

  touch(): void {
    this.touched = true
    this.validation = this.schema.validate(this.value)

    this.update()
  }

  get error(): string {
    return this.validation[0] ? this.validation[0].message : ''
  }

  get schema(): S.Struct<any, any> {
    return this._schema
  }

  get value(): any {
    return ObjectUtils.get(this.store, this.path)
  }

  get hasBeenTouched(): boolean {
    return this.touched === true
  }

  get hasError(): boolean {
    return this.validation[0] !== undefined
  }

  get isErrorVisible(): boolean {
    return this.hasBeenTouched && this.hasError
  }

  get isValid(): boolean {
    return this.validation[0] === undefined
  }

  set schema(schema: S.Struct<any, any>) {
    this._schema = schema
  }
}
