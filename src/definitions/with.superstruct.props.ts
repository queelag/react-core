import { ReactNode } from 'react'
import { InputFileMode, InputTouchTrigger, InputType, SelectMode } from './enums'
import { SelectOption } from './interfaces'
import { HTMLDivProps, HTMLInputProps } from './props'
import { WithFormFieldProps } from './with.superstruct.interfaces'

/** @category Prop */
export interface CheckBoxProps<T extends object> extends HTMLDivProps, WithFormFieldProps<T> {}

/** @category Prop */
export interface InputProps<T extends object> extends Omit<HTMLInputProps, 'prefix' | 'type'>, WithFormFieldProps<T> {
  prefix?: ReactNode
  suffix?: ReactNode
  touchTrigger?: InputTouchTrigger
  type?: InputType
}

/** @category Prop */
export interface InputFileProps<T extends object> extends HTMLInputProps, WithFormFieldProps<T> {
  mode?: InputFileMode
}

/** @category Prop */
export interface SelectProps<T extends object> extends HTMLDivProps, WithFormFieldProps<T> {
  mode?: SelectMode
  options: SelectOption[]
}

/** @category Prop */
export interface SwitchProps<T extends object> extends HTMLDivProps, WithFormFieldProps<T> {}
