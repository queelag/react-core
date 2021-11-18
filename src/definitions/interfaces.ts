import { ID } from '@queelag/core'
import { LegacyRef, MutableRefObject, ReactNode } from 'react'
import type { ComponentStore } from '../modules/component.store'
import type { Color, FeedbackType, Layer, Orientation, Shape, Size, Theme } from './enums'
import { IconProps, WizardStepContentProps } from './props'
import { SelectOptionValue } from './types'

export interface AppearanceData {
  theme: Theme
}

export interface BottomSheetItem<T> extends WithDescription, WithIcon, WithRoute<T>, WithTitle {
  onClick?: () => any
}

export interface BottomTabberItem<T> extends WithIcon, Required<WithRoute<T>> {}

export interface ColorPickerConfigurationValue {
  any: (color: Color) => [string, string, string, string]
  gray: [string, string, string, string]
  mono: string
  monoInverted: string
}

export interface ColorPickerConfiguration {
  background: ColorPickerConfigurationValue
  border: ColorPickerConfigurationValue
  divide: ColorPickerConfigurationValue
  feedback: {
    error: Color
    information: Color
    success: Color
    warning: Color
  }
  text: ColorPickerConfigurationValue
}

export interface ComponentStoreProps<T extends Element = HTMLDivElement> extends WithGetStore<T, any>, WithLayer, WithOrientation, WithShape, WithSize {
  id?: ID
  ref?: LegacyRef<T> | MutableRefObject<T>
  update?: () => void
}

export interface ConfigurationData {
  ComponentStore: {
    generateIDOnConstruction: boolean
  }
}

export interface ContextMenuItem<T> extends WithIcon, WithRoute<T>, WithTitle {
  onClick?: () => any
}

export interface DisclosureItem extends WithDescription, WithIcon, WithTitle {
  children?: ReactNode
  expanded?: boolean
}

export interface InputFileItem {
  base64: string
  buffer: ArrayBuffer
  id: ID
  name: string
  size: number
  timestamp: number
  type: string
}

export interface OnboardingItem extends WithDescription, WithIcon, WithImage, WithTitle {}

export interface SelectOption {
  label: string
  value: SelectOptionValue
}

export interface SidebarItem<T> extends WithIcon, Required<WithRoute<T>> {}

export interface TopTabberItem {
  children: ReactNode
  name: string
}

export interface WithAvatar {
  avatar?: string
  avatarProps?: string
}

export interface WithBackground extends WithLayer {
  background?: Color | string
}

export interface WithColor extends WithLayer {
  color?: Color | string
}

export interface WithDescription {
  description?: ReactNode
}

export interface WithDestructive {
  destructive?: boolean
}

export interface WithFeedbackType {
  type: FeedbackType
}

export interface WithFooter {
  footer?: ReactNode
}

export interface WithGetStore<T extends Element, U extends ComponentStore<T>> {
  getStore?: (store: U) => void
}

export interface WithHeader {
  header?: ReactNode
}

export interface WithIcon {
  icon?: (props: IconProps) => JSX.Element
  iconProps?: IconProps
}

export interface WithImage<T = any> {
  image?: string
  imageProps?: T
}

export interface WithLayer {
  layer?: Layer
}

export interface WithLocalizationProps<T extends object> {
  inject?: T
  path?: ReactNode
}

export interface WithName {
  name: string
}

export interface WithOrientation {
  orientation?: Orientation
}

export interface WithRoute<T> {
  route?: T
}

export interface WithShape {
  shape?: Shape
}

export interface WithSize {
  size?: Size | number | string
}

export interface WithTitle {
  title?: ReactNode
}

export interface WizardStep {
  canGoBack: () => boolean
  canGoNext: () => boolean
  children: (props: WizardStepContentProps) => ReactNode
  description: ReactNode
  name: string
  title: ReactNode
}

export interface WizardStepPartial extends Partial<WizardStep> {}
