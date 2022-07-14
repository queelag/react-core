import { MouseEvent, ReactNode } from 'react'
import type { ComponentFormFieldStore } from '../modules/component.form.field.store'
import type { CheckBoxStore } from '../stores/check.box.store'
import type { InputFileStore } from '../stores/input.file.store'
import type { InputStore } from '../stores/input.store'
import type { SelectStore } from '../stores/select.store'
import type { SwitchStore } from '../stores/switch.store'
import type { TextAreaStore } from '../stores/text.area.store'
import type { InputFileMode, InputMode, InputTouchTrigger, InputType, SelectMode, TextAreaMode, TextAreaTouchTrigger } from './enums'
import { SelectOption, WithIcon } from './interfaces'
import { HTMLDivProps, HTMLInputProps, HTMLLabelProps, HTMLSpanProps, HTMLTextAreaProps, IconProps } from './props'
import { WithFormFieldProps } from './with.superstruct.interfaces'

/** @category Prop */
export interface CheckBoxProps<T extends object> extends HTMLDivProps, WithFormFieldProps<HTMLDivElement, CheckBoxStore<T>, T> {
  onClick?: (event: MouseEvent<HTMLDivElement>, value?: boolean) => any
}

/** @category Prop */
export interface FormFieldLabelProps<T extends ComponentFormFieldStore<U, V>, U extends Element, V extends object, IP = IconProps>
  extends HTMLLabelProps,
    WithIcon<IP> {
  store?: T
  value?: string
}

/** @category Prop */
export interface FormFieldErrorProps<T extends ComponentFormFieldStore<U, V>, U extends Element, V extends object> extends HTMLSpanProps {
  store?: T
}

/** @category Prop */
export interface InputProps<T extends object> extends Omit<HTMLInputProps, 'prefix' | 'type'>, WithFormFieldProps<HTMLInputElement, InputStore<T>, T> {
  mode?: InputMode
  prefix?: ReactNode
  suffix?: ReactNode
  touchTrigger?: InputTouchTrigger
  type?: InputType
}

/** @category Prop */
export interface InputFileProps<T extends object> extends HTMLInputProps, WithFormFieldProps<HTMLInputElement, InputFileStore<T>, T> {
  mode?: InputFileMode
}

/** @category Prop */
export interface SelectProps<T extends object> extends HTMLDivProps, WithFormFieldProps<HTMLDivElement, SelectStore<T>, T> {
  clearable?: boolean
  mode?: SelectMode
  options?: SelectOption[]
}

/** @category Prop */
export interface SwitchProps<T extends object> extends HTMLDivProps, WithFormFieldProps<HTMLDivElement, SwitchStore<T>, T> {
  onClick?: (event: MouseEvent<HTMLDivElement>, value?: boolean) => any
}

/** @category Prop */
export interface TextAreaProps<T extends object>
  extends Omit<HTMLTextAreaProps, 'prefix' | 'type'>,
    WithFormFieldProps<HTMLTextAreaElement, TextAreaStore<T>, T> {
  mode?: TextAreaMode
  touchTrigger?: TextAreaTouchTrigger
}
