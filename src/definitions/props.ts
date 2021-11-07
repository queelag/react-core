import { FormEvent, MutableRefObject, ReactNode } from 'react'
import type { AvatarStore } from '../stores/avatar.store'
import type { BottomTabberStore } from '../stores/bottom.tabber.store'
import type { ButtonStore } from '../stores/button.store'
import type { DividerStore } from '../stores/divider.store'
import type { FormStore } from '../stores/form.store'
import type { IconStore } from '../stores/icon.store'
import type { ImageStore } from '../stores/image.store'
import type { ListStore } from '../stores/list.store'
import type { OnboardingStore } from '../stores/onboarding.store'
import type { SidebarStore } from '../stores/sidebar.store'
import type { TagStore } from '../stores/tag.store'
import type { TopTabberStore } from '../stores/top.tabber.store'
import type { VirtualizedListStore } from '../stores/virtualized.list.store'
import type { WizardStore } from '../stores/wizard.store'
import type { ButtonVariant } from './enums'
import {
  BottomSheetItem,
  BottomTabberItem,
  ContextMenuItem,
  DisclosureSection,
  OnboardingItem,
  SidebarItem,
  TopTabberItem,
  WithBackground,
  WithColor,
  WithDescription,
  WithDestructive,
  WithFeedbackType,
  WithFooter,
  WithGetStore,
  WithHeader,
  WithIcon,
  WithImage,
  WithLayer,
  WithLocalizationProps,
  WithOrientation,
  WithShape,
  WithSize,
  WithTitle,
  WizardStepPartial
} from './interfaces'
import { OmitLegacyRef, StatisticValue, WizardOnStepChange } from './types'

/** @category Prop */
export interface AlertProps extends HTMLDivProps, WithDescription, WithTitle, WithFeedbackType {}

/** @category Prop */
export interface AlertDialogProps extends DialogProps, WithDestructive {
  onClickCancel?: () => any
  onClickConfirm: () => any
}

/** @category Prop */
export interface AvatarProps extends HTMLDivProps, WithBackground, WithColor, WithGetStore<HTMLDivElement, AvatarStore>, WithIcon, WithImage, WithShape {
  size: number
  text?: string
  textProps?: HTMLElementProps
}

/** @category Prop */
export interface BadgeProps extends HTMLDivProps {
  value: number
}

/** @category Prop */
export interface BottomSheetProps<T> extends HTMLDivProps, WithHeader, WithTitle {
  items?: BottomSheetItem<T>[]
}

/** @category Prop */
export interface BottomTabberProps<T> extends HTMLDivProps, WithGetStore<HTMLDivElement, BottomTabberStore<T>> {
  isItemActive?: (item: BottomTabberItem<T>) => boolean
  items: BottomTabberItem<T>[]
  onClickItem?: (item: BottomTabberItem<T>) => any
}

/** @category Prop */
export interface ButtonProps
  extends HTMLButtonProps,
    WithBackground,
    WithColor,
    WithDestructive,
    WithGetStore<HTMLButtonElement, ButtonStore>,
    WithIcon,
    WithShape,
    WithSize,
    WithTitle {
  spinning?: boolean
  variant?: ButtonVariant
}

/** @category Prop */
export interface CardProps extends HTMLDivProps, WithDescription, WithFooter, WithHeader, WithImage, WithLayer, WithTitle {}

/** @category Prop */
export interface ColorableDivProps extends HTMLDivProps, WithLayer {
  background?: string
  border?: string
  divide?: string
  text?: string
}

/** @category Prop */
export interface ContextMenuProps<T> extends HTMLDivProps {
  items: ContextMenuItem<T>[]
}

/** @category Prop */
export interface DialogProps extends HTMLDivProps, WithDescription, WithFooter, WithHeader, WithTitle {
  buttons?: Partial<ButtonProps>[]
  onHide?: () => any
  onShow?: () => any
}

/** @category Prop */
export interface DisclosureProps extends HTMLDListProps {
  sections: DisclosureSection[]
}

/** @category Prop */
export interface DividerProps extends HTMLDivProps, WithColor, WithGetStore<HTMLDivElement, DividerStore>, WithLayer, WithOrientation {}

/** @category Prop */
export interface EmptyProps extends HTMLDivProps, WithDescription, WithIcon, WithLayer, WithTitle {}

/** @category Prop */
export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'>, WithGetStore<HTMLFormElement, FormStore> {
  disabled?: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => any
}

/** @category Prop */
export interface HeaderProps extends HTMLDivProps {
  canNavigateBack?: boolean
  logo?: JSX.Element
  onClickBack?: () => any
  title?: string
}

/** @category Prop */
export interface HTMLAnchorProps extends OmitLegacyRef<JSX.IntrinsicElements['a']> {}
/** @category Prop */
export interface HTMLButtonProps extends OmitLegacyRef<JSX.IntrinsicElements['button']> {}
/** @category Prop */
export interface HTMLDivProps extends OmitLegacyRef<JSX.IntrinsicElements['div']> {}
/** @category Prop */
export interface HTMLDListProps extends OmitLegacyRef<JSX.IntrinsicElements['dl']> {}
/** @category Prop */
export interface HTMLElementProps extends OmitLegacyRef<JSX.IntrinsicElements['abbr']> {}
/** @category Prop */
export interface HTMLImageProps extends OmitLegacyRef<JSX.IntrinsicElements['img']> {}
/** @category Prop */
export interface HTMLInputProps extends OmitLegacyRef<JSX.IntrinsicElements['input']> {}
/** @category Prop */
export interface HTMLLabelProps extends OmitLegacyRef<JSX.IntrinsicElements['label']> {}
/** @category Prop */
export interface HTMLLIProps extends OmitLegacyRef<JSX.IntrinsicElements['li']> {}
/** @category Prop */
export interface HTMLFormProps extends OmitLegacyRef<JSX.IntrinsicElements['form']> {}
/** @category Prop */
export interface HTMLOListProps extends OmitLegacyRef<JSX.IntrinsicElements['ol']> {}
/** @category Prop */
export interface HTMLParagraphProps extends OmitLegacyRef<JSX.IntrinsicElements['p']> {}
/** @category Prop */
export interface HTMLSpanProps extends OmitLegacyRef<JSX.IntrinsicElements['span']> {}
/** @category Prop */
export interface HTMLUListProps extends OmitLegacyRef<JSX.IntrinsicElements['ul']> {}
/** @category Prop */
export interface HTMLVideoProps extends OmitLegacyRef<JSX.IntrinsicElements['video']> {}

/** @category Prop */
export interface IconProps extends Omit<SVGElementProps, 'fill' | 'orientation' | 'stroke'>, WithColor, WithGetStore<SVGSVGElement, IconStore>, WithLayer {
  fill?: boolean | string
  size?: number
  src?: string
  stroke?: boolean | string
  thickness?: number
}

/** @category Prop */
export interface ImageProps extends HTMLImageProps, WithGetStore<HTMLImageElement, ImageStore>, WithShape, WithSize {
  alpha?: boolean
  cache?: boolean
  quality?: number
}

/** @category Prop */
export interface LabelProps<T extends object> extends HTMLLabelProps, WithColor, WithLayer, WithLocalizationProps<T> {}

/** @category Prop */
export interface ListProps<T> extends HTMLUListProps, WithGetStore<HTMLUListElement, ListStore<T>> {
  empty?: (props: any) => JSX.Element
  items: T[]
  renderItem: (v: T, k: number) => ReactNode
}

/** @category Prop */
export interface ListItemProps extends HTMLLIProps, WithDescription, WithLayer, WithTitle {
  avatar?: AvatarProps
  image?: HTMLImageProps
}

/** @category Prop */
export interface LoadingProps extends HTMLDivProps, WithDescription, WithTitle {}

/** @category Prop */
export interface LocalizableLabelProps<T extends object> extends HTMLLabelProps, Omit<LocalizableTextProps<T>, 'element'> {}

/** @category Prop */
export interface LocalizableSpanProps<T extends object> extends HTMLSpanProps, Omit<LocalizableTextProps<T>, 'element'> {}

/** @category Prop */
export interface LocalizableTextProps<T extends object> extends WithColor, WithLocalizationProps<T> {
  element: (props: any) => JSX.Element
}

export interface MeterProps extends HTMLDivProps, WithColor, WithShape, WithSize {
  maximum?: number
  minimum?: number
  value: number
}

/** @category Prop */
export interface OnboardingProps extends HTMLDivProps, WithGetStore<HTMLDivElement, OnboardingStore> {
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
export interface RouterRendererProps extends HTMLDivProps {
  fallback?: () => JSX.Element
  map: Map<string, () => JSX.Element>
  route: string
}

/** @category Prop */
export interface SectionProps extends HTMLDivProps, WithDescription, WithLayer, WithTitle {}

/** @category Prop */
export interface SettingProps extends HTMLDivProps, WithDescription, WithLayer, WithTitle {}

/** @category Prop */
export interface SidebarProps<T> extends HTMLDivProps, WithFooter, WithGetStore<HTMLDivElement, SidebarStore<T>>, WithHeader, WithTitle {
  isItemActive?: (item: SidebarItem<T>) => boolean
  items: SidebarItem<T>[]
  onClickItem?: (item: SidebarItem<T>) => any
}

/** @category Prop */
export interface SpinnerProps extends Omit<IconProps, 'svg'> {}

/** @category Prop */
export interface StatisticProps extends HTMLDivProps, WithFeedbackType, WithIcon, WithLayer, WithTitle {
  progress?: number
  reference?: StatisticValue
  value: StatisticValue
}

/** @category Prop */
export interface SVGElementProps extends OmitLegacyRef<JSX.IntrinsicElements['svg']> {}

/** @category Prop */
export interface TagProps extends HTMLDivProps, WithBackground, WithColor, WithGetStore<HTMLDivElement, TagStore>, WithIcon, WithLayer {
  destroyable?: boolean
  destroyed?: boolean
  onDestroy?: () => any
  text: string
}

/** @category Prop */
export interface TopTabberProps extends HTMLDivProps, WithGetStore<HTMLDivElement, TopTabberStore> {
  activeItemName?: string
  items: TopTabberItem[]
}

/** @category Prop */
export interface VirtualizedListProps<T> extends HTMLUListProps, WithGetStore<HTMLUListElement, VirtualizedListStore<T>>, WithOrientation {
  dummy: (props: any) => JSX.Element
  empty?: (props: any) => JSX.Element
  gutter?: number
  innerClassName?: string
  itemParentProps?: HTMLDivProps
  items: T[]
  renderItem: (v: T, k: number) => JSX.Element
}

export interface VirtualizedListStoreProps<T> extends VirtualizedListProps<T> {
  dummyRef: MutableRefObject<HTMLDivElement>
  innerRef: MutableRefObject<HTMLDivElement>
}

/** @category Prop */
export interface WizardProps extends HTMLDivProps, WithGetStore<HTMLDivElement, WizardStore> {
  activeStepName?: string
  onStepChange?: WizardOnStepChange
  steps: WizardStepPartial[]
}

export interface WizardStepContentProps {
  store: WizardStore
}
