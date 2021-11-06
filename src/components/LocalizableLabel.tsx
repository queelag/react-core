import React, { ForwardedRef, forwardRef } from 'react'
import { HTMLLabelProps, LocalizableLabelProps } from '../definitions/props'
import { LocalizableText } from './LocalizableText'

export const LocalizableLabel = forwardRef(<T extends object>(props: LocalizableLabelProps<T>, ref: ForwardedRef<HTMLLabelElement>) => {
  return <LocalizableText {...props} element={(p: HTMLLabelProps) => <label {...p} />} ref={ref} />
})
