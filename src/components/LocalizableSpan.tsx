import React from 'react'
import { HTMLSpanProps, LocalizableSpanProps } from '../definitions/props'
import { LocalizableText } from './LocalizableText'

export function LocalizableSpan<T extends object>(props: LocalizableSpanProps<T>) {
  return <LocalizableText {...props} element={(p: HTMLSpanProps) => <span {...p} />} />
}
