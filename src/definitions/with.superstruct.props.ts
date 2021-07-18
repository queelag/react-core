import * as S from 'superstruct'
import { InputType, Layer } from './enums'
import { ComponentLayerProps, HTMLInputProps } from './props'

export type ComponentFormFieldProps<T extends Element, U extends object> = {
  disabled?: boolean
  label?: string
  path: keyof U
  required?: boolean
  schema?: S.Struct<any, any>
  store: U
  touched?: boolean
} & ComponentLayerProps<T>

/** @category Prop */
export type InputProps<T extends object> = {
  label?: string
  layer?: Layer
  onBlurCallback?: () => any
  onChangeCallback?: () => any
  onFocusCallback?: () => any
  path: keyof T
  prefix?: JSX.Element
  required?: boolean
  schema?: S.Struct<any, any>
  store: T
  suffix?: JSX.Element
  touched?: boolean
  type?: InputType
} & Omit<HTMLInputProps, 'onBlur' | 'onChange' | 'onFocus' | 'type'>
