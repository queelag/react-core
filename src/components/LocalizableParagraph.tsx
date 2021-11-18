import React, { ForwardedRef } from 'react'
import { HTMLParagraphProps, LocalizableLabelProps } from '../definitions/props'
import { forwardRef } from '../modules/forward.ref'
import { LocalizableText } from './LocalizableText'

export const LocalizableParagraph = forwardRef(<T extends object>(props: LocalizableLabelProps<T>, ref: ForwardedRef<HTMLParagraphElement>) => {
  return <LocalizableText {...props} element={(p: HTMLParagraphProps) => <p {...p} />} ref={ref} />
})
