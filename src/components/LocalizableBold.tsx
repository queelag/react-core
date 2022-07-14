import React, { ForwardedRef } from 'react'
import { HTMLBoldProps, LocalizableBoldProps } from '../definitions/props'
import { forwardRef } from '../modules/forward.ref'
import { LocalizableText } from './LocalizableText'

export const LocalizableBold = forwardRef(<T extends object>(props: LocalizableBoldProps<T>, ref: ForwardedRef<HTMLElement>) => {
  return <LocalizableText {...props} element={(p: HTMLBoldProps) => <b {...p} />} ref={ref} />
})
