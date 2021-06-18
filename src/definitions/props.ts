import { AnySchema } from 'joi'
import { ListChildComponentProps } from 'react-window'
import { RouterStore } from '../stores/router.store'
import { ButtonType, Color, DividerType, FeedbackType, InputFileMode, InputType, Layer, SelectMode, Shape } from './enums'
import {
  BottomSheetItem,
  BottomTabberItem,
  ContextMenuItem,
  OnboardingItem,
  SelectOption,
  SidebarItem,
  StatisticValue,
  TopTabberItem,
  WizardOnStepChange,
  WizardStepPartial
} from './types'

export type AlertProps = {
  description?: string
  title?: string
  type: FeedbackType
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type AvatarProps = {
  background?: string
  color?: string
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  shape?: Shape
  size?: number
  source?: string
  text?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type BadgeProps = {
  value: number
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type BoldProps = {
  color?: Color
  inject?: any[]
  layer?: Layer
  path?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export type BottomSheetProps = {
  items?: BottomSheetItem[]
  name: string
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type BottomTabberProps = {
  items: BottomTabberItem[]
  router: RouterStore
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type ButtonProps = {
  color?: Color
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  onClick: () => any
  shape?: Shape
  submit?: boolean
  title?: string
  type?: ButtonType
} & Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type'>

export type CardProps = {
  header?: JSX.Element
  layer?: Layer
  footer?: JSX.Element
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type CheckboxProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  path: string
  required?: boolean
  store: T
  touched?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type ContextMenuProps = {
  items: ContextMenuItem[]
  name: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type DialogProps = {
  button?: Partial<ButtonProps>
  onClickConfirm: () => any
} & Omit<ModalProps, 'button'>

export type DividerProps = {
  color?: Color
  layer?: Layer
  type?: DividerType
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type EmptyProps = {
  layer?: Layer
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type FormProps = {
  layer?: Layer
  onSubmit: () => any
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>

export type HeaderProps = {
  logo?: JSX.Element
  router: RouterStore
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type IconProps = {
  color?: string
  fill?: boolean
  layer?: Layer
  size?: number
  stroke?: boolean
  svg?: string
  thickness?: number
} & Omit<React.SVGProps<SVGSVGElement>, 'fill' | 'stroke'>

export type ImageProps = {
  fallback?: (props: any) => JSX.Element
  shape?: Shape
  size: number
  source: string
} & Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'>

export type InputFileProps<T extends object> = {
  label?: string
  layer?: Layer
  mode?: InputFileMode
  onChangeCallback?: () => any
  path: string
  required?: boolean
  store: T
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>

export type InputProps<T extends object> = {
  label?: string
  layer?: Layer
  onBlurCallback?: () => any
  onChangeCallback?: () => any
  onFocusCallback?: () => any
  path: string
  prefix?: JSX.Element
  required?: boolean
  schema?: AnySchema
  store: T
  suffix?: JSX.Element
  touched?: boolean
  type?: InputType
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onBlur' | 'onChange' | 'onFocus' | 'type'>

export type LabelProps = {
  color?: Color
  inject?: any[]
  layer?: Layer
  path?: string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export type ListProps<T> = {
  items: T[]
  renderItem: (v: T, k: number) => JSX.Element
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type ListItemProps = {
  avatar?: string | JSX.Element
  description?: string | JSX.Element
  isFirst?: boolean
  isLast?: boolean
  layer?: Layer
  title: string | JSX.Element
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type LoadingProps = {
  title: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type ModalProps = {
  button?: ButtonProps
  name: string
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type OnboardingProps = {
  items: OnboardingItem[]
  onEnd: () => any
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type ParentProps = {
  children: JSX.Element
}

export type RedirectProps = {
  to: string
  store: RouterStore
}

export type ResultProps = {
  description?: string
  icon?: (props: IconProps) => JSX.Element
  image?: string
  title: string
  type?: FeedbackType
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type RouterProps = {
  store: RouterStore
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type SelectProps<T extends object> = {
  disabled?: boolean
  label: string
  layer?: Layer
  mode?: SelectMode
  options: SelectOption[]
  path: string
  placeholder?: string
  required?: boolean
  store: T
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type SettingProps = {
  description: string
  layer?: Layer
  title: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type SidebarProps = {
  footer?: JSX.Element
  items: SidebarItem[]
  logo: JSX.Element
  router: RouterStore
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type SpanProps = {
  color?: Color
  inject?: any[]
  layer?: Layer
  path?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type SpinnerProps = {
  color?: string
  size?: number
} & Omit<React.SVGProps<SVGSVGElement>, 'fill' | 'stroke'>

export type StatisticProps = {
  feedback?: FeedbackType
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  progress?: number
  reference?: StatisticValue
  title: string
  value: StatisticValue
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type SwitchProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  onChangeCallback?: (value: boolean) => any
  path: string
  store: T
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type TagProps = {
  color: Color
  destroyable?: boolean
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  onDestroyCallback?: () => any
  text: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type TopTabberProps = {
  active?: string
  items: TopTabberItem[]
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type VirtualizedListProps<T> = {
  dummy: JSX.Element
  gutter?: number
  itemClassName?: string
  items: T[]
  layer?: Layer
  renderItem: (v: T, k: number) => JSX.Element
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type VirtualizedListItemProps<T> = {
  renderItem: (v: T, k: number) => JSX.Element
} & ListChildComponentProps

export type WizardProps = {
  active?: string
  epilogue: string
  name: string
  onStepChange?: WizardOnStepChange
  steps: WizardStepPartial[]
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
