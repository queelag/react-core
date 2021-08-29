import { FormEvent, ReactNode } from 'react'
import { ButtonVariant } from './enums'
import {
  OnboardingItem,
  WithBackground,
  WithColor,
  WithDescription,
  WithFeedbackType,
  WithFooter,
  WithHeader,
  WithIcon,
  WithLayer,
  WithLocalizationProps,
  WithName,
  WithOrientation,
  WithShape,
  WithSize,
  WithTitle,
  WizardStepPartial
} from './interfaces'
import { StatisticValue, WizardOnStepChange } from './types'

/** @category Prop */
export interface AlertProps extends HTMLDivProps, WithDescription, WithTitle, WithFeedbackType {}

/** @category Prop */
export interface AvatarProps extends HTMLDivProps, WithBackground, WithColor, WithShape {
  icon?: (props: IconProps) => JSX.Element
  iconProps?: IconProps
  image?: string
  imageProps?: ImageProps
  size: number
  text?: string
  textProps?: HTMLElementProps
}

/** @category Prop */
export interface BackdropProps extends HTMLDivProps {
  opacity?: number
}

/** @category Prop */
export interface BadgeProps extends HTMLDivProps {
  value: number
}

/** @category Prop */
export interface ButtonProps extends HTMLButtonProps, WithBackground, WithColor, WithIcon, WithShape, WithSize, WithTitle {
  destructive?: boolean
  spinning?: boolean
  variant?: ButtonVariant
}

/** @category Prop */
export interface CardProps extends HTMLDivProps, WithHeader, WithLayer, WithFooter, WithTitle {}

/** @category Prop */
export interface ColorableDivProps extends HTMLDivProps, WithLayer {
  background?: string
  border?: string
  divide?: string
  text?: string
}

/** @category Prop */
export interface DialogProps extends HTMLDivProps, WithDescription, WithFooter, WithHeader, Partial<WithName>, WithTitle {
  buttons?: Partial<ButtonProps>[]
  onHide?: () => any
  onShow?: () => any
}

/** @category Prop */
export interface DividerProps extends HTMLDivProps, WithColor, WithLayer, WithOrientation {}

/** @category Prop */
export interface EmptyProps extends HTMLDivProps, WithDescription, WithLayer, WithTitle {}

/** @category Prop */
export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  disabled?: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => any
}

/** @category Prop */
export interface HTMLAnchorProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}
/** @category Prop */
export interface HTMLButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
/** @category Prop */
export interface HTMLDivProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
/** @category Prop */
export interface HTMLDListProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement> {}
/** @category Prop */
export interface HTMLElementProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}
/** @category Prop */
export interface HTMLImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}
/** @category Prop */
export interface HTMLInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}
/** @category Prop */
export interface HTMLLabelProps extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {}
/** @category Prop */
export interface HTMLLIProps extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {}
/** @category Prop */
export interface HTMLFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}
/** @category Prop */
export interface HTMLOListProps extends React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {}
/** @category Prop */
export interface HTMLParagraphProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {}
/** @category Prop */
export interface HTMLSpanProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}
/** @category Prop */
export interface HTMLUListProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {}

/** @category Prop */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'fill' | 'orientation' | 'stroke'>, WithColor, WithLayer {
  fill?: boolean | string
  size?: number
  source?: string
  stroke?: boolean | string
  thickness?: number
}

/** @category Prop */
export interface ImageProps extends Omit<HTMLImageProps, 'src'>, WithShape, WithSize {
  alpha?: boolean
  cache?: boolean
  quality?: number
  source: string
}

/** @category Prop */
export interface LabelProps extends HTMLLabelProps, WithColor, WithLayer, WithLocalizationProps {}

/** @category Prop */
export interface ListProps<T> extends HTMLUListProps {
  empty?: ReactNode
  items: T[]
  renderItem: (v: T, k: number) => ReactNode
}

/** @category Prop */
export interface ListItemProps extends HTMLDivProps, WithDescription, WithLayer, WithTitle {
  avatar?: AvatarProps
  image?: ImageProps
}

/** @category Prop */
export interface LoadingProps extends HTMLDivProps, WithDescription, WithTitle {}

/** @category Prop */
export interface LocalizableLabelProps extends HTMLLabelProps, Omit<LocalizableTextProps, 'element'> {}

/** @category Prop */
export interface LocalizableSpanProps extends HTMLSpanProps, Omit<LocalizableTextProps, 'element'> {}

/** @category Prop */
export interface LocalizableTextProps extends WithColor, WithLocalizationProps {
  element: (props: any) => JSX.Element
}

/** @category Prop */
export interface OnboardingProps extends HTMLDivProps {
  activeItemIndex?: number
  items: OnboardingItem[]
  onEnd?: () => any
}

/** @category Prop */
export interface ParentProps {
  children: JSX.Element
}

/** @category Prop */
export interface ResultProps extends HTMLDivProps, WithDescription, WithFeedbackType, WithIcon, WithTitle {}

/** @category Prop */
export interface SettingProps extends HTMLDivProps, WithDescription, WithLayer, WithTitle {}

/** @category Prop */
export interface SpinnerProps extends Omit<IconProps, 'svg'> {}

/** @category Prop */
export interface StatisticProps extends HTMLDivProps, WithFeedbackType, WithIcon, WithLayer, WithTitle {
  progress?: number
  reference?: StatisticValue
  value: StatisticValue
}

/** @category Prop */
export interface SVGElementProps extends React.SVGProps<SVGSVGElement> {}

/** @category Prop */
export interface TagProps extends HTMLDivProps, WithBackground, WithColor, WithIcon, WithLayer {
  destroyable?: boolean
  destroyed?: boolean
  text: string
}

/** @category Prop */
export interface VirtualizedListProps<T> extends HTMLUListProps, WithOrientation {
  dummy: () => JSX.Element
  empty?: () => JSX.Element
  gutter?: number
  itemParentProps?: HTMLDivProps
  items: T[]
  renderItem: (v: T, k: number) => JSX.Element
}

/** @category Prop */
export interface WizardProps extends HTMLDivProps {
  activeStepName?: string
  onStepChange?: WizardOnStepChange
  steps: WizardStepPartial[]
}
