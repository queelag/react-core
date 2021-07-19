import { Struct } from 'superstruct'
import { ComponentLayerStoreProps, WithLayer } from './interfaces'

export interface ComponentFormFieldStoreProps<T extends Element, U extends object> extends ComponentLayerStoreProps<T>, WithFormFieldProps<U> {}

export interface WithFormFieldProps<T extends object> extends WithLayer {
  disabled?: boolean
  label?: string
  path?: keyof T
  placeholder?: string
  required?: boolean
  schema?: Struct<any, any>
  store?: T
  touched?: boolean
}
