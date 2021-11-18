import { ClassAttributes, RefAttributes } from 'react'
import type { DirectionHorizontal } from './enums'

export type OmitLegacyRef<U extends ClassAttributes<T>, T = any> = Omit<U, 'ref'> & RefAttributes<T>

export type OmitTitle<T extends { title?: string }> = Omit<T, 'title'>

export type SelectOptionValue = string

export type StatisticValue = number | string

export type VirtualizedListItemKey = number | string

export type WizardOnStepChange = (from: string, to: string, direction: DirectionHorizontal) => any
