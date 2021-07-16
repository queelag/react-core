import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import * as S from 'superstruct'
import { ComponentName, Layer } from '../definitions/enums'
import { CheckboxProps } from '../definitions/props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'

/**
 * @category Store
 */
export class CheckboxStore<U extends object> extends ComponentFormFieldStore<HTMLDivElement, U> {
  disabled: boolean

  constructor(
    disabled: boolean = false,
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.TWO,
    name: string = ComponentName.CHECKBOX,
    path: keyof U = '' as any,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    required: boolean = false,
    store: U = {} as any,
    touched: boolean = false,
    update: () => void = noop
  ) {
    super(name, id, label, layer, path, ref, required, Dummy.schema, store, touched, update)

    this.disabled = disabled
    this.validation = this.schema.validate(this.value)
  }

  onClick = (): void => {
    if (this.isEnabled) {
      this.store[this.path] = !this.value as any

      this.touched = true
      this.validation = this.schema.validate(this.value)
    }
  }

  get schema(): S.Struct<boolean> {
    return this.required ? S.refine(S.boolean(), 'true', (v: boolean) => v === true) : S.boolean()
  }

  get value(): boolean {
    return this.store[this.path] as any
  }

  get isEnabled(): boolean {
    return this.disabled === false
  }

  set schema(schema: S.Struct<boolean>) {
    this._schema = schema
  }
}

/** @category Constant */
export const CHECK_BOX_STORE_KEYS: (keyof CheckboxProps<any> & keyof CheckboxStore<any>)[] = [
  'disabled',
  'id',
  'label',
  'layer',
  'onClick',
  'path',
  'required',
  'store',
  'touched'
]
