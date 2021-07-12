import { RouteContext } from 'react-router5/dist/types'
import { ListChildComponentProps } from 'react-window'
import { Router } from 'router5'
import * as S from 'superstruct'
import { ButtonType, Color, DividerType, FeedbackType, InputFileMode, InputType, Layer, Orientation, SelectMode, Shape, Size } from './enums'
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
} & HTMLDivProps

export type AvatarProps = {
  background?: string
  color?: string
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  shape?: Shape
  size?: number
  source?: string
  text?: string
} & HTMLDivProps

export type BackdropProps = {
  opacity?: number
} & HTMLDivProps

export type BadgeProps = {
  value: number
} & HTMLDivProps

export type BottomSheetProps = {
  items?: BottomSheetItem[]
  name: string
  title?: string
} & HTMLDivProps

export type BottomTabberProps = {
  items: BottomTabberItem[]
  router: Router
} & HTMLDivProps

export type ButtonProps = {
  background?: Color
  color?: Color
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  shape?: Shape
  size?: Size
  spinning?: boolean
  submit?: boolean
  title?: string
  type?: ButtonType
} & Omit<HTMLButtonProps, 'type'>

export type CardProps = {
  header?: JSX.Element
  layer?: Layer
  footer?: JSX.Element
  title?: string
} & HTMLDivProps

export type CheckboxProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  path: keyof T
  required?: boolean
  store: T
  touched?: boolean
} & HTMLDivProps

export type ColorDivProps = {
  background?: Color
  border?: Color
  divide?: Color
  layer?: Layer
  text?: Color
} & HTMLDivProps

export type ContextMenuProps = {
  items: ContextMenuItem[]
  name: string
} & HTMLDivProps

export type DialogProps = {
  button?: Partial<ButtonProps>
  onClickConfirm: () => any
} & Omit<ModalProps, 'button'>

export type DividerProps = {
  color?: Color
  layer?: Layer
  type?: DividerType
} & HTMLDivProps

export type EmptyProps = {
  layer?: Layer
} & HTMLDivProps

export type FormProps = {
  layer?: Layer
  onSubmit: () => any
} & Omit<HTMLFormProps, 'onSubmit'>

export type HeaderProps = {
  logo?: JSX.Element
  router: Router
  title?: string
} & HTMLDivProps

export type HTMLAnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
export type HTMLButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export type HTMLDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export type HTMLDListProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>
export type HTMLElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
export type HTMLImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
export type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type HTMLLabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
export type HTMLLIProps = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
export type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
export type HTMLOListProps = React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
export type HTMLParagraphProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
export type HTMLSpanProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
export type HTMLUListProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>

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
  heightRatio?: number
  shape?: Shape
  size?: number
  source: string
  widthRatio?: number
} & Omit<HTMLImageProps, 'src'>

export type InputFileProps<T extends object> = {
  label?: string
  layer?: Layer
  mode?: InputFileMode
  onChangeCallback?: () => any
  path: keyof T
  required?: boolean
  store: T
} & Omit<HTMLInputProps, 'onChange'>

export type InputProps<T extends object> = {
  label?: string
  layer?: Layer
  onBlurCallback?: () => any
  onChangeCallback?: () => any
  onFocusCallback?: () => any
  path: keyof T
  prefix?: JSX.Element
  required?: boolean
  schema?: S.Struct
  store: T
  suffix?: JSX.Element
  touched?: boolean
  type?: InputType
} & Omit<HTMLInputProps, 'onBlur' | 'onChange' | 'onFocus' | 'type'>

export type LabelProps = {
  color?: Color
  inject?: any[]
  layer?: Layer
  path?: string
} & HTMLLabelProps

export type ListProps<T> = {
  empty: JSX.Element
  items: T[]
  renderItem: (v: T, k: number) => JSX.Element
} & HTMLDivProps

export type ListItemProps = {
  avatar?: string | JSX.Element
  description?: string | JSX.Element
  isFirst?: boolean
  isLast?: boolean
  layer?: Layer
  title: string | JSX.Element
} & HTMLDivProps

export type LoadingProps = {
  title: string
} & HTMLDivProps

export type ModalProps = {
  button?: ButtonProps
  name: string
  title?: string
} & HTMLDivProps

export type OnboardingProps = {
  items: OnboardingItem[]
  onEnd: () => any
} & HTMLDivProps

export type ParentProps = {
  children: JSX.Element
}

export type ResultProps = {
  description?: string
  icon?: (props: IconProps) => JSX.Element
  image?: string
  title: string
  type?: FeedbackType
} & HTMLDivProps

export type RouterRendererProps = {
  context: RouteContext
  fallback?: (props: { context: RouteContext }) => JSX.Element
  map: Map<string, (props: { context: RouteContext }) => JSX.Element>
} & HTMLDivProps

export type SelectProps<T extends object> = {
  disabled?: boolean
  label: string
  layer?: Layer
  mode?: SelectMode
  options: SelectOption[]
  path: keyof T
  placeholder?: string
  required?: boolean
  store: T
} & HTMLDivProps

export type SettingProps = {
  description: string
  layer?: Layer
  title: string
} & HTMLDivProps

export type SidebarProps = {
  footer?: JSX.Element
  items: SidebarItem[]
  logo: JSX.Element
  router: Router
} & HTMLDivProps

export type SpinnerProps = {
  color?: string
  size?: number
} & Omit<SVGElementProps, 'fill' | 'stroke'>

export type StatisticProps = {
  feedback?: FeedbackType
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  progress?: number
  reference?: StatisticValue
  title: string
  value: StatisticValue
} & HTMLDivProps

export type SVGElementProps = React.SVGProps<SVGSVGElement>

export type SwitchProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  onChangeCallback?: (value: boolean) => any
  path: keyof T
  store: T
} & HTMLDivProps

export type TagProps = {
  background?: Color
  color?: Color
  destroyable?: boolean
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  onDestroyCallback?: () => any
  text: string
} & HTMLDivProps

export type TopTabberProps = {
  active?: string
  items: TopTabberItem[]
} & HTMLDivProps

export type VirtualizedListProps<T> = {
  dummy: JSX.Element
  empty: JSX.Element
  gutter?: number
  itemParentProps?: HTMLDivProps
  items: T[]
  orientation?: Orientation
  renderItem: (v: T, k: number) => JSX.Element
} & HTMLDivProps

export type VirtualizedListItemProps<T> = {
  renderItem: (v: T, k: number) => JSX.Element
} & ListChildComponentProps

export type WizardProps = {
  active?: string
  epilogue: string
  name: string
  onStepChange?: WizardOnStepChange
  steps: WizardStepPartial[]
} & HTMLDivProps
