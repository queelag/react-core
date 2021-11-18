import { ParentProps } from '../definitions/props'

/**
 * A generic parent component.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Parent } from '@queelag/react-core'
 *
 * function App() {
 *   return <Parent><div id="CHILD" /></Parent>
 * }
 * ```
 *
 * @category Component
 */
export function Parent(props: ParentProps) {
  return props.children || null
}
