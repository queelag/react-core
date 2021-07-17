import React from 'react'

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
export function Blank() {
  return <div style={{ display: 'none' }} />
}
