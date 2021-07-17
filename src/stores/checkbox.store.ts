import * as S from 'superstruct'
import { ComponentName } from '../definitions/enums'
import { CheckboxProps, ComponentFormFieldProps } from '../definitions/props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for CheckBox stores, uses a custom validation schema based on required and handles value updates.
 *
 * @category Store
 */
export class CheckboxStore<U extends object> extends ComponentFormFieldStore<HTMLDivElement, U> {
  constructor(props: CheckboxProps<U> & ComponentFormFieldProps<HTMLDivElement, U>) {
    super(ComponentName.CHECKBOX, props)

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
