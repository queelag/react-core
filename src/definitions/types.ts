import { DirectionHorizontal } from './enums'

export type SelectOptionValue = string

export type StatisticValue = number | string

export type VirtualizedListItemKey = number | string

export type WizardOnStepChange = (from: string, to: string, direction: DirectionHorizontal) => any
