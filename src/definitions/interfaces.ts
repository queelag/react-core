import { ID } from '@queelag/core'
import { LegacyRef, MutableRefObject, ReactNode } from 'react'
import type { ComponentStore } from '../modules/component.store'
import type { Color, FeedbackType, Layer, Orientation, Shape, Size, Theme } from './enums'
import { HTMLImageProps, IconProps, WizardStepContentProps } from './props'
import { SelectOptionValue } from './types'

export interface AppearanceData {
  theme: Theme
}

export interface BottomSheetItem<T> extends WithColor, WithDescription, WithIcon, WithRoute<T>, WithTitle {
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

export interface SidebarItem<T> extends WithIcon, Required<WithRoute<T>> {}

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

export interface WithImage {
  image?: string
  imageProps?: HTMLImageProps
}

export interface WithLayer {
  layer?: Layer
}

export interface WithLocalizationProps<T extends object> {
  inject?: T
  path?: string
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
