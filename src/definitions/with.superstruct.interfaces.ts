import type * as S from 'superstruct'
import { ComponentStoreProps, WithLayer } from './interfaces'

export interface ComponentFormFieldStoreProps<T extends Element, U extends object> extends ComponentStoreProps<T>, WithFormFieldProps<U> {}

export interface WithFormFieldProps<T extends object> extends WithLayer {
  disabled?: boolean
  label?: string
  path?: keyof T
  placeholder?: string
  required?: boolean
  schema?: S.Struct<any, any>
  store?: T
  touched?: boolean
}
