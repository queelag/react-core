import { ObjectUtils } from '@queelag/core'
import React from 'react'
import { BACKDROP_PROPS_KEYS } from '../definitions/constants'
import { BackdropProps } from '../definitions/props'

/**
 * A component that dims the content behind.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Backdrop } from '@queelag/react-core'
 *
 * function Modal() {
 *   return (
 *     <div className="container" style={{ position: 'relative' }}>
 *       <Backdrop />
 *       <div className="content" style={{ position: 'absolute' }} />
 *     </div>
 *   )
 * }
 * ```
 *
 * @category Component
 */
export function Backdrop(props: BackdropProps) {
  return (
    <div
      {...ObjectUtils.omit(props, BACKDROP_PROPS_KEYS)}
      style={{ background: 'black', height: '100%', opacity: props.opacity || 0.5, position: 'absolute', width: '100%' }}
    />
  )
}
