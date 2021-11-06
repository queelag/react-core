import React, { ForwardedRef, forwardRef } from 'react'
import { HTMLSpanProps, LocalizableSpanProps } from '../definitions/props'
import { LocalizableText } from './LocalizableText'

export const LocalizableSpan = forwardRef(<T extends object>(props: LocalizableSpanProps<T>, ref: ForwardedRef<HTMLSpanElement>) => {
  return <LocalizableText {...props} element={(p: HTMLSpanProps) => <span {...p} />} ref={ref} />
})
