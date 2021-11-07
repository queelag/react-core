import React, { ForwardedRef } from 'react'
import { HTMLLabelProps, LocalizableLabelProps } from '../definitions/props'
import { forwardRef } from '../modules/forward.ref'
import { LocalizableText } from './LocalizableText'

export const LocalizableLabel = forwardRef(<T extends object>(props: LocalizableLabelProps<T>, ref: ForwardedRef<HTMLLabelElement>) => {
  return <LocalizableText {...props} element={(p: HTMLLabelProps) => <label {...p} />} ref={ref} />
})
