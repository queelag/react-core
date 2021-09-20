import { ID } from '@queelag/core'
import { LegacyRef, MutableRefObject, ReactNode } from 'react'
import { Color, FeedbackType, Layer, Orientation, Shape, Size, Theme } from './enums'
import { IconProps } from './props'
import { SelectOptionValue } from './types'

export interface AppearanceData {
  theme: Theme
}

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

export interface InputFileItem {
  base64: string
  buffer: ArrayBuffer
  id: ID
  name: string
  size: number
  timestamp: number
  type: string
}

export interface OnboardingItem extends WithDescription, WithTitle {
  picture: string
}

export interface SelectOption {
  label: string
  value: SelectOptionValue
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

export interface WithFeedbackType {
  type: FeedbackType
}

export interface WithIcon {
  icon?: (props: IconProps) => JSX.Element
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
  content: ReactNode
  description: string
  name: string
  title: string
}

export interface WizardStepPartial extends Partial<WizardStep> {}
