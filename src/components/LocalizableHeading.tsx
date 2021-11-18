import React, { ForwardedRef } from 'react'
import { HeadingVariant } from '../definitions/enums'
import { HTMLHeadingProps, LocalizableHeadingProps } from '../definitions/props'
import { forwardRef } from '../modules/forward.ref'
import { LocalizableText } from './LocalizableText'

export const LocalizableHeading = forwardRef(<T extends object>(props: LocalizableHeadingProps<T>, ref: ForwardedRef<HTMLHeadingElement>) => {
  switch (props.variant) {
    case HeadingVariant.H1:
      return <LocalizableText {...props} element={(p: HTMLHeadingProps) => <h1 {...p} />} ref={ref} />
    case HeadingVariant.H2:
      return <LocalizableText {...props} element={(p: HTMLHeadingProps) => <h2 {...p} />} ref={ref} />
    case HeadingVariant.H3:
      return <LocalizableText {...props} element={(p: HTMLHeadingProps) => <h3 {...p} />} ref={ref} />
    case HeadingVariant.H4:
      return <LocalizableText {...props} element={(p: HTMLHeadingProps) => <h4 {...p} />} ref={ref} />
    case HeadingVariant.H5:
      return <LocalizableText {...props} element={(p: HTMLHeadingProps) => <h5 {...p} />} ref={ref} />
    case HeadingVariant.H6:
    default:
      return <LocalizableText {...props} element={(p: HTMLHeadingProps) => <h6 {...p} />} ref={ref} />
  }
})
