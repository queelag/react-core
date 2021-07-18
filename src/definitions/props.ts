import { ID } from '@queelag/core'
import { FormEvent, LegacyRef, MutableRefObject } from 'react'
import { RouteContext } from 'react-router5/dist/types'
import { ListChildComponentProps } from 'react-window'
import { Router } from 'router5'
import * as S from 'superstruct'
import { ButtonType, Color, DividerType, FeedbackType, InputFileMode, InputType, Layer, Orientation, SelectMode, Shape, Size } from './enums'
import {
  BottomSheetItem,
  BottomTabberItem,
  ContextMenuItem,
  OmitRef,
  OnboardingItem,
  SelectOption,
  SidebarItem,
  StatisticValue,
  TopTabberItem,
  WizardOnStepChange,
  WizardStepPartial
} from './types'

/** @category Prop */
export type AlertProps = {
  description?: string
  title?: string
  type: FeedbackType
} & HTMLDivProps

/** @category Prop */
export type AvatarProps = {
  background?: string
  color?: string
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  ratio?: number
  shape?: Shape
  size: number
  source?: string
  text?: string
  thickness?: number
} & OmitRef<HTMLDivProps>

/** @category Prop */
export type BackdropProps = {
  opacity?: number
} & HTMLDivProps

/** @category Prop */
export type BadgeProps = {
  value: number
} & HTMLDivProps

/** @category Prop */
export type BottomSheetProps = {
  items?: BottomSheetItem[]
  name: string
  title?: string
} & HTMLDivProps

/** @category Prop */
export type BottomTabberProps = {
  items: BottomTabberItem[]
  router: Router
} & HTMLDivProps

/** @category Prop */
export type ButtonProps = {
  background?: Color
  color?: Color
  destructive?: boolean
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  shape?: Shape
  size?: Size
  spinning?: boolean
  submit?: boolean
  title?: string
  type?: ButtonType
} & Omit<HTMLButtonProps, 'type'>

/** @category Prop */
export type CardProps = {
  header?: JSX.Element
  layer?: Layer
  footer?: JSX.Element
  title?: string
} & HTMLDivProps

/** @category Prop */
export type CheckboxProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  path: keyof T
  required?: boolean
  store: T
  touched?: boolean
} & HTMLDivProps

/** @category Prop */
export type ColorableDivProps = {
  background?: Color
  border?: Color
  divide?: Color
  layer?: Layer
  text?: Color
} & HTMLDivProps

export type ComponentProps<T extends Element> = {
  id?: ID
  ref?: LegacyRef<T> | MutableRefObject<T>
  update?: () => void
}

export type ComponentFormFieldProps<T extends Element, U extends object> = {
  disabled?: boolean
  label?: string
  path: keyof U
  required?: boolean
  schema?: S.Struct<any, any>
  store: U
  touched?: boolean
} & ComponentLayerProps<T>

export type ComponentLayerProps<T extends Element> = {
  layer?: Layer
} & ComponentProps<T>

export type ComponentLayerShapeProps<T extends Element> = ComponentProps<T> & ComponentLayerProps<T> & ComponentShapeProps<T>
export type ComponentLayerShapeSizeProps<T extends Element> = ComponentProps<T> & ComponentLayerProps<T> & ComponentShapeProps<T> & ComponentSizeProps<T>

export type ComponentShapeProps<T extends Element> = {
  shape?: Shape
} & ComponentProps<T>

export type ComponentSizeProps<T extends Element> = {
  size?: Size
} & ComponentProps<T>

/** @category Prop */
export type ContextMenuProps = {
  items: ContextMenuItem[]
  name: string
} & HTMLDivProps

/** @category Prop */
export type DialogProps = {
  button?: Partial<ButtonProps>
  onClickConfirm: () => any
} & Omit<ModalProps, 'button'>

/** @category Prop */
export type DividerProps = {
  color?: Color
  layer?: Layer
  type?: DividerType
} & HTMLDivProps

/** @category Prop */
export type EmptyProps = {
  layer?: Layer
} & HTMLDivProps

/** @category Prop */
export type FormProps = {
  layer?: Layer
  onSubmit: (event: FormEvent<HTMLFormElement>) => any
} & Omit<HTMLFormProps, 'onSubmit'>

/** @category Prop */
export type HeaderProps = {
  logo?: JSX.Element
  router: Router
  title?: string
} & HTMLDivProps

/** @category Prop */
export type HTMLAnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
/** @category Prop */
export type HTMLButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
/** @category Prop */
export type HTMLDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
/** @category Prop */
export type HTMLDListProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>
/** @category Prop */
export type HTMLElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
/** @category Prop */
export type HTMLImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
/** @category Prop */
export type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
/** @category Prop */
export type HTMLLabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
/** @category Prop */
export type HTMLLIProps = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
/** @category Prop */
export type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
/** @category Prop */
export type HTMLOListProps = React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
/** @category Prop */
export type HTMLParagraphProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
/** @category Prop */
export type HTMLSpanProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
/** @category Prop */
export type HTMLUListProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>

/** @category Prop */
export type IconProps = {
  color?: string
  fill?: boolean | string
  layer?: Layer
  size?: number
  stroke?: boolean | string
  svg?: string
  thickness?: number
} & Omit<React.SVGProps<SVGSVGElement>, 'fill' | 'stroke'>

/** @category Prop */
export type ImageProps = {
  fallback?: ((props: any) => JSX.Element) | string
  orientation?: Orientation
  ratio?: number
  shape?: Shape
  size?: number
  source: string
} & Omit<HTMLImageProps, 'src'>

/** @category Prop */
export type InputFileProps<T extends object> = {
  label?: string
  layer?: Layer
  mode?: InputFileMode
  onChangeCallback?: () => any
  path: keyof T
  required?: boolean
  store: T
} & Omit<HTMLInputProps, 'onChange'>

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

/** @category Prop */
export type LabelProps = {
  color?: Color
  inject?: any[]
  layer?: Layer
  path?: string
} & HTMLLabelProps

/** @category Prop */
export type ListProps<T> = {
  empty?: () => JSX.Element
  items: T[]
  renderItem: (v: T, k: number) => JSX.Element
} & HTMLUListProps

/** @category Prop */
export type ListItemProps = {
  avatar?: string | JSX.Element
  description?: string | JSX.Element
  isFirst?: boolean
  isLast?: boolean
  layer?: Layer
  title: string | JSX.Element
} & HTMLDivProps

/** @category Prop */
export type LoadingProps = {
  title: string
} & HTMLDivProps

/** @category Prop */
export type ModalProps = {
  description?: string
  name: string
  title?: string
} & HTMLDivProps

/** @category Prop */
export type OnboardingProps = {
  items: OnboardingItem[]
  onEnd: () => any
} & HTMLDivProps

/** @category Prop */
export type ParentProps = {
  children: JSX.Element
}

/** @category Prop */
export type ResultProps = {
  description?: string
  icon?: (props: IconProps) => JSX.Element
  image?: string
  title: string
  type?: FeedbackType
} & HTMLDivProps

/** @category Prop */
export type RouterRendererProps = {
  context: RouteContext
  fallback?: (props: { context: RouteContext }) => JSX.Element
  map: Map<string, (props: { context: RouteContext }) => JSX.Element>
} & HTMLDivProps

/** @category Prop */
export type SelectProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  mode?: SelectMode
  options: SelectOption[]
  path: keyof T
  placeholder?: string
  required?: boolean
  store: T
} & HTMLDivProps

/** @category Prop */
export type SettingProps = {
  description: string
  layer?: Layer
  title: string
} & HTMLDivProps

/** @category Prop */
export type SidebarProps = {
  footer?: JSX.Element
  items: SidebarItem[]
  router: Router
} & HTMLDivProps

/** @category Prop */
export type SpinnerProps = {
  color?: string
  size?: number
} & Omit<SVGElementProps, 'fill' | 'stroke'>

/** @category Prop */
export type StatisticProps = {
  feedback?: FeedbackType
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  progress?: number
  reference?: StatisticValue
  title: string
  value: StatisticValue
} & HTMLDivProps

/** @category Prop */
export type SVGElementProps = React.SVGProps<SVGSVGElement>

/** @category Prop */
export type SwitchProps<T extends object> = {
  disabled?: boolean
  label?: string
  layer?: Layer
  path: keyof T
  store: T
} & HTMLDivProps

/** @category Prop */
export type TagProps = {
  background?: Color
  color?: Color
  destroyable?: boolean
  icon?: (props: IconProps) => JSX.Element
  layer?: Layer
  onDestroyCallback?: () => any
  text: string
} & HTMLDivProps

/** @category Prop */
export type TopTabberProps = {
  active?: string
  items: TopTabberItem[]
} & HTMLDivProps

/** @category Prop */
export type VirtualizedListProps<T> = {
  dummy: () => JSX.Element
  empty?: () => JSX.Element
  gutter?: number
  itemParentProps?: HTMLDivProps
  items: T[]
  orientation?: Orientation
  renderItem: (v: T, k: number) => JSX.Element
} & HTMLUListProps

/** @category Prop */
export type VirtualizedListItemProps<T> = {
  renderItem: (v: T, k: number) => JSX.Element
} & ListChildComponentProps

/** @category Prop */
export type WizardProps = {
  active?: string
  onStepChange?: WizardOnStepChange
  steps: WizardStepPartial[]
} & HTMLDivProps
