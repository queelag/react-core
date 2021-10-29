import { ID } from '@queelag/core'
import { LegacyRef, MutableRefObject, ReactNode } from 'react'
import { Color, FeedbackType, Layer, Orientation, Shape, Size, Theme } from './enums'
import { IconProps, ImageProps, WizardStepContentProps } from './props'
import { SelectOptionValue } from './types'

export interface AppearanceData {
  theme: Theme
}

export interface BottomSheetItem extends WithColor, WithDescription, WithIcon, WithRoute, WithTitle {
  onClick?: () => any
}

export interface BottomTabberItem extends WithIcon, Required<WithRoute> {}

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

export interface ComponentStoreProps<T extends Element> extends WithLayer, WithOrientation, WithShape, WithSize {
  id?: ID
  ref?: LegacyRef<T> | MutableRefObject<T>
  update?: () => void
}

export interface ConfigurationData {
  ComponentStore: {
    generateIDOnConstruction: boolean
  }
}

export interface ContextMenuItem extends WithIcon, WithRoute, WithTitle {
  onClick?: () => any
}

export interface DisclosureSection extends WithDescription, WithIcon, Required<WithTitle> {
  content?: ReactNode
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

export interface SidebarItem extends WithIcon, Required<WithRoute> {}

export interface TopTabberItem {
  component: ReactNode
  name: string
}

export interface WithBackground extends WithLayer {
  background?: string
}

export interface WithColor extends WithLayer {
  color?: string
}

export interface WithDescription {
  description?: string
}

export interface WithDestructive {
  destructive?: boolean
}

export interface WithFeedbackType {
  type: FeedbackType
}

export interface WithIcon {
  icon?: (props: IconProps) => JSX.Element
  iconProps?: IconProps
}

export interface WithImage {
  image?: string
  imageProps?: ImageProps
}

export interface WithLayer {
  layer?: Layer
}

export interface WithLocalizationProps<T extends object> {
  inject?: T
  path?: string
}

export interface WithFooter {
  footer?: ReactNode
}

export interface WithHeader {
  header?: ReactNode
}

export interface WithName {
  name: string
}

export interface WithOrientation {
  orientation?: Orientation
}

export interface WithRoute {
  route?: any
}

export interface WithShape {
  shape?: Shape
}

export interface WithSize {
  size?: Size | number | string
}

export interface WithTitle {
  title?: string
}

export interface WizardStep {
  canGoBack: () => boolean
  canGoNext: () => boolean
  content: (props: WizardStepContentProps) => JSX.Element
  description: string
  name: string
  title: string
}

export interface WizardStepPartial extends Partial<WizardStep> {}
