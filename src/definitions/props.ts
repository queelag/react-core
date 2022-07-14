import { FormEvent, MutableRefObject, ReactElement, ReactNode } from 'react'
import type { AvatarStore } from '../stores/avatar.store'
import type { BadgeStore } from '../stores/badge.store'
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
import type { ButtonVariant, Color, HeadingVariant } from './enums'
import {
  BottomSheetItem,
  BottomTabberItem,
  ContextMenuItem,
  DisclosureItem,
  OnboardingItem,
  SidebarItem,
  TopTabberItem,
  WithAvatar,
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
  WithSanitize,
  WithShape,
  WithSize,
  WithTitle,
  WithTooltip,
  WizardStepPartial
} from './interfaces'
import { OmitElement, OmitLegacyRef, OmitTitle, StatisticValue, WizardOnStepChange } from './types'

/** @category Prop */
export interface AlertProps extends OmitTitle<HTMLDivProps>, WithDescription, WithFeedbackType, WithTitle {}

/** @category Prop */
export interface AlertDialogProps extends DialogProps, WithDestructive {
  onClickCancel?: () => any
  onClickConfirm?: () => any
}

/** @category Prop */
export interface AvatarProps<ICP = IconProps, IMP = ImageProps>
  extends HTMLDivProps,
    WithBackground,
    WithColor,
    WithGetStore<HTMLDivElement, AvatarStore>,
    WithIcon<ICP>,
    WithImage<IMP>,
    WithShape {
  size?: number
  text?: string
  textProps?: HTMLSpanProps
}

/** @category Prop */
export interface BadgeProps extends HTMLDivProps, WithGetStore<HTMLDivElement, BadgeStore> {
  value?: number
}

/** @category Prop */
export interface BottomSheetProps<T> extends OmitTitle<HTMLDivProps>, WithHeader, WithTitle {
  items?: BottomSheetItem<T>[]
}

/** @category Prop */
export interface BottomTabberProps<T> extends HTMLDivProps, WithGetStore<HTMLDivElement, BottomTabberStore<T>> {
  isItemActive?: (item: BottomTabberItem<T>) => boolean
  items?: BottomTabberItem<T>[]
  onClickItem?: (item: BottomTabberItem<T>) => any
}

/** @category Prop */
export interface ButtonProps<IP = IconProps>
  extends OmitTitle<HTMLButtonProps>,
    WithBackground,
    WithColor,
    WithDestructive,
    WithGetStore<HTMLButtonElement, ButtonStore>,
    WithIcon<IP>,
    WithShape,
    WithSize,
    WithTitle,
    WithTooltip {
  spinning?: boolean
  variant?: ButtonVariant
}

/** @category Prop */
export interface CardProps<IP = ImageProps> extends OmitTitle<HTMLDivProps>, WithDescription, WithFooter, WithHeader, WithImage<IP>, WithTitle {}

/** @category Prop */
export interface ColorableDivProps extends HTMLDivProps, WithLayer {
  background?: Color | string
  border?: Color | string
  divide?: Color | string
  text?: Color | string
}

/** @category Prop */
export interface ContextMenuProps<T> extends HTMLDivProps {
  items: ContextMenuItem<T>[]
}

/** @category Prop */
export interface DialogProps extends OmitTitle<HTMLDivProps>, WithDescription, WithFooter, WithHeader, WithTitle {
  buttons?: Partial<ButtonProps>[]
  onHide?: () => any
  onShow?: () => any
}

/** @category Prop */
export interface DisclosureProps extends HTMLDListProps {
  items: DisclosureItem[]
}

/** @category Prop */
export interface DividerProps extends HTMLDivProps, WithColor, WithGetStore<HTMLDivElement, DividerStore>, WithOrientation {}

/** @category Prop */
export interface EmptyProps<IP = IconProps> extends OmitTitle<HTMLDivProps>, WithDescription, WithIcon<IP>, WithTitle {}

/** @category Prop */
export interface FormProps extends Omit<HTMLFormProps, 'onSubmit'>, WithGetStore<HTMLFormElement, FormStore> {
  disabled?: boolean
  onSubmit?: (event: FormEvent<HTMLFormElement>) => any
}

/** @category Prop */
export interface HeaderProps extends OmitTitle<HTMLDivProps>, WithDescription, WithTitle {
  canNavigateBack?: boolean
  logo?: ReactElement
  onClickBack?: () => any
}

/** @category Prop */
export interface HTMLAnchorProps extends OmitLegacyRef<JSX.IntrinsicElements['a']> {}
/** @category Prop */
export interface HTMLBoldProps extends OmitLegacyRef<JSX.IntrinsicElements['b']> {}
/** @category Prop */
export interface HTMLButtonProps extends OmitLegacyRef<JSX.IntrinsicElements['button']> {}
/** @category Prop */
export interface HTMLDivProps extends OmitLegacyRef<JSX.IntrinsicElements['div']> {}
/** @category Prop */
export interface HTMLDListProps extends OmitLegacyRef<JSX.IntrinsicElements['dl']> {}
/** @category Prop */
export interface HTMLElementProps extends OmitLegacyRef<JSX.IntrinsicElements['abbr']> {}
/** @category Prop */
export interface HTMLHeadingProps extends OmitLegacyRef<JSX.IntrinsicElements['h1']> {}
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
export interface HTMLSectionProps extends OmitLegacyRef<JSX.IntrinsicElements['section']> {}
/** @category Prop */
export interface HTMLSpanProps extends OmitLegacyRef<JSX.IntrinsicElements['span']> {}
/** @category Prop */
export interface HTMLTextAreaProps extends OmitLegacyRef<JSX.IntrinsicElements['textarea']> {}
/** @category Prop */
export interface HTMLUListProps extends OmitLegacyRef<JSX.IntrinsicElements['ul']> {}
/** @category Prop */
export interface HTMLVideoProps extends OmitLegacyRef<JSX.IntrinsicElements['video']> {}

/** @category Prop */
export interface IconProps
  extends Omit<SVGElementProps, 'fill' | 'orientation' | 'stroke'>,
    WithColor,
    WithGetStore<SVGSVGElement, IconStore>,
    WithLayer,
    WithSanitize {
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
export interface LabelProps<T extends object> extends HTMLLabelProps, WithColor, WithLocalizationProps<T> {}

/** @category Prop */
export interface ListProps<T> extends HTMLUListProps, WithGetStore<HTMLUListElement, ListStore<T>> {
  empty?: ReactNode
  items?: T[]
  renderItem?: (item: T, index: number) => ReactNode
}

/** @category Prop */
export interface ListItemProps<AP = AvatarProps, IP = ImageProps> extends OmitTitle<HTMLLIProps>, WithAvatar<AP>, WithDescription, WithImage<IP>, WithTitle {}

/** @category Prop */
export interface LoadingProps extends OmitTitle<HTMLDivProps>, WithDescription, WithTitle {}

/** @category Prop */
export interface LocalizableBoldProps<T extends object> extends HTMLBoldProps, OmitElement<LocalizableTextProps<T>> {}

/** @category Prop */
export interface LocalizableHeadingProps<T extends object> extends HTMLHeadingProps, OmitElement<LocalizableTextProps<T>> {
  variant?: HeadingVariant
}

/** @category Prop */
export interface LocalizableLabelProps<T extends object> extends HTMLLabelProps, OmitElement<LocalizableTextProps<T>> {}

/** @category Prop */
export interface LocalizableParagraphProps<T extends object> extends HTMLParagraphProps, OmitElement<LocalizableTextProps<T>> {}

/** @category Prop */
export interface LocalizableSpanProps<T extends object> extends HTMLSpanProps, OmitElement<LocalizableTextProps<T>> {}

/** @category Prop */
export interface LocalizableTextProps<T extends object> extends WithColor, WithLocalizationProps<T>, WithSanitize {
  element: (props: any) => ReactElement
}

export interface MeterProps extends HTMLDivProps, WithColor, WithShape, WithSize {
  maximum?: number
  minimum?: number
  value?: number
}

/** @category Prop */
export interface OnboardingProps extends HTMLDivProps, WithGetStore<HTMLDivElement, OnboardingStore> {
  activeItemIndex?: number
  items?: OnboardingItem[]
  onEnd?: () => any
}

/** @category Prop */
export interface ParentProps {
  children?: ReactNode
}

/** @category Prop */
export interface ResultProps<IP = IconProps> extends OmitTitle<HTMLDivProps>, WithDescription, WithFeedbackType, WithIcon<IP>, WithTitle {}

/** @category Prop */
export interface RouterRendererProps extends HTMLDivProps {
  fallback?: () => ReactElement
  map: Map<string, () => ReactElement>
  route: string
}

/** @category Prop */
export interface SectionProps extends OmitTitle<HTMLSectionProps>, WithDescription, WithTitle {}

/** @category Prop */
export interface SettingProps extends OmitTitle<HTMLDivProps>, WithDescription, WithTitle {}

/** @category Prop */
export interface SidebarProps<T> extends OmitTitle<HTMLDivProps>, WithFooter, WithGetStore<HTMLDivElement, SidebarStore<T>>, WithHeader, WithTitle {
  isItemActive?: (item: SidebarItem<T>) => boolean
  items?: SidebarItem<T>[]
  onClickItem?: (item: SidebarItem<T>) => any
}

/** @category Prop */
export interface SpinnerProps extends IconProps {}

/** @category Prop */
export interface StatisticProps<IP = IconProps> extends OmitTitle<HTMLDivProps>, WithFeedbackType, WithIcon<IP>, WithTitle {
  progress?: number
  reference?: StatisticValue
  value?: StatisticValue
}

/** @category Prop */
export interface SVGElementProps extends OmitLegacyRef<JSX.IntrinsicElements['svg']> {}

/** @category Prop */
export interface TagProps<IP = IconProps> extends HTMLDivProps, WithBackground, WithColor, WithGetStore<HTMLDivElement, TagStore>, WithIcon<IP>, WithLayer {
  destroyable?: boolean
  destroyed?: boolean
  onDestroy?: () => any
}

/** @category Prop */
export interface TopTabberProps extends HTMLDivProps, WithGetStore<HTMLDivElement, TopTabberStore> {
  activeItemName?: string
  items?: TopTabberItem[]
}

/** @category Prop */
export interface VirtualizedListProps<T> extends HTMLUListProps, WithGetStore<HTMLUListElement, VirtualizedListStore<T>>, WithOrientation {
  dummy?: ReactNode
  empty?: ReactNode
  gutter?: number
  innerClassName?: string
  itemParentProps?: HTMLDivProps
  items?: T[]
  size?: number
  renderItem?: (value: T, key: number) => ReactElement
}

export interface VirtualizedListStoreProps<T> extends VirtualizedListProps<T> {
  dummyRef: MutableRefObject<HTMLDivElement>
  innerRef: MutableRefObject<HTMLDivElement>
}

/** @category Prop */
export interface WizardProps extends HTMLDivProps, WithGetStore<HTMLDivElement, WizardStore> {
  activeStepName?: string
  onStepChange?: WizardOnStepChange
  steps?: WizardStepPartial[]
}

export interface WizardStepContentProps {
  store: WizardStore
}
