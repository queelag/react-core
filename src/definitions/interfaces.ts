import { ID } from '@queelag/core'
import { LegacyRef, MutableRefObject, ReactNode } from 'react'
import { Color, FeedbackType, Layer, Orientation, Shape, Size } from './enums'
import { IconProps } from './props'
import { SelectOptionValue } from './types'

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

export interface ComponentStoreProps<T extends Element> {
  id?: ID
  ref?: LegacyRef<T> | MutableRefObject<T>
  update?: () => void
}

export interface ComponentLayerStoreProps<T extends Element> extends ComponentStoreProps<T>, WithLayer {}

export interface ComponentLayerShapeStoreProps<T extends Element> extends ComponentStoreProps<T>, ComponentLayerStoreProps<T>, ComponentShapeStoreProps<T> {}
export interface ComponentLayerShapeSizeStoreProps<T extends Element>
  extends ComponentStoreProps<T>,
    ComponentLayerStoreProps<T>,
    ComponentShapeStoreProps<T>,
    ComponentSizeStoreProps<T> {}

export interface ComponentShapeStoreProps<T extends Element> extends ComponentStoreProps<T>, WithShape {}

export interface ComponentSizeStoreProps<T extends Element> extends ComponentStoreProps<T>, WithSize {}

export interface InputFileItem {
  data: string
  id: ID
  name: string
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

export interface WithLocalizationProps {
  inject?: any[]
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
  size?: Size
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

export interface WizardStepPartial extends WithDescription, WithName, WithTitle {
  canGoBack?: () => boolean
  canGoNext?: () => boolean
  content?: ReactNode
}
