import { ID } from '@queelag/core'
import { Color, DirectionHorizontal } from './enums'
import { IconProps } from './props'

export type BottomSheetItem = {
  color?: Color
  description?: string
  icon?: (props: IconProps) => JSX.Element
  onClick: () => any
  title: string
}

export type BottomTabberItem = {
  icon?: (props: IconProps) => JSX.Element
  name: string
}

export type ColorPickerConfigurationValue = {
  any: (color: Color) => [string, string, string, string]
  gray: [string, string, string, string]
  mono: string
  monoInverted: string
}

export type ColorPickerConfiguration = {
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

export type ContextMenuItem = {
  icon: (props: IconProps) => JSX.Element
  onClick: () => any
  title: string
}

export type InputFileItem = {
  data: string
  id: ID
  name: string
}

export type OnboardingItem = {
  description: string
  picture: string
  title: string
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

export type Route = {
  children: RouteChild[]
  component: RouteComponent
  name: string
  parameters: RouteParameters
  parent: RouteComponent
  path: string
  redirect: [] | [string, string]
  regex: RegExp
}

export type RouteChild = Omit<Route, 'children'>

export type RouteParameters = { [k: string]: string }

export type RoutePartial = {
  children?: RoutePartialChild[]
} & Optional<Omit<Route, 'children' | 'parameters' | 'path' | 'regex'>, 'parent' | 'redirect'>

export type RoutePartialChild = Omit<RoutePartial, 'children'>

export type RouteComponent = (props: any) => JSX.Element

export type SelectOption = {
  label: string
  value: SelectOptionValue
}

export type SelectOptionValue = string

export type SidebarItem = {
  icon: (props: IconProps) => JSX.Element
  name: string
}

export type StatisticValue = number | string

export type TopTabberItem = {
  component: (props: any) => JSX.Element
  name: string
}

export type VirtualizedListItemKey = number | string

export type WizardStep = {
  canGoBack: () => boolean
  canGoNext: () => boolean
  content: (props: any) => JSX.Element
  description: string
  name: string
  title: string
}

export type WizardStepPartial = Optional<WizardStep, 'canGoBack' | 'canGoNext'>

export type WizardOnStepChange = (from: string, to: string, direction: DirectionHorizontal) => any
