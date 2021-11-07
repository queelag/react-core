import type { Struct } from 'superstruct'
import type { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { ComponentStoreProps, WithGetStore, WithIcon, WithLayer } from './interfaces'

export interface ComponentFormFieldStoreProps<T extends Element, U extends object> extends ComponentStoreProps<T>, WithFormFieldProps<T, any, U> {}

export interface WithFormFieldProps<T extends Element, U extends ComponentFormFieldStore<T, V>, V extends object>
  extends WithGetStore<T, U>,
    WithIcon,
    WithLayer {
  disabled?: boolean
  label?: string
  novalidate?: boolean
  path?: keyof V
  placeholder?: string
  required?: boolean
  schema?: Struct<any, any>
  store?: V
  touched?: boolean
}
