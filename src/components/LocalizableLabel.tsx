import React from 'react'
import { HTMLLabelProps, LocalizableLabelProps } from '../definitions/props'
import { LocalizableText } from './LocalizableText'

export function LocalizableLabel<T extends object>(props: LocalizableLabelProps<T>) {
  return <LocalizableText {...props} element={(p: HTMLLabelProps) => <label {...p} />} />
}
