import React from 'react'
import { HTMLLabelProps, LocalizableLabelProps } from '../definitions/props'
import { LocalizableText } from './LocalizableText'

export function LocalizableLabel(props: LocalizableLabelProps) {
  return <LocalizableText {...props} element={(p: HTMLLabelProps) => <label {...p} />} />
}
