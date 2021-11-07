import React, { ForwardedRef } from 'react'
import { forwardRef } from '../modules/forward.ref'

/**
 * A component composed of a div with display set to 'none'.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Blank } from '@queelag/react-core'
 *
 * function App() {
 *   return <Blank />
 * }
 * ```
 *
 * @category Component
 */
export const Blank = forwardRef((props: any, ref: ForwardedRef<HTMLDivElement>) => {
  return <div ref={ref} style={{ display: 'none' }} />
})
