import React from 'react'
import { RouterRendererProps } from '../definitions/with.router5.props'

/**
 * Renders the matching component to the current route in the context.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { RouterRenderer } from '@queelag/react-core'
 * import { useRouteNode } from 'react-router5'
 *
 * const routerMap = new Map()
 * routerMap.set('AUTH', (props) => <div {...props} id='AUTH' />)
 * routerMap.set('HOME', (props) => <div {...props} id='HOME' />)
 *
 * function App() {
 *   const context = useContext
 *
 *   return <RouterRenderer context={useRouteNode('')} map={routerMap} />
 * }
 * ```
 *
 * @category Component
 */
export function RouterRenderer(props: RouterRendererProps) {
  const component = { element: props.map.get(props.context.route.name) || props.fallback || (() => <div />) }
  return <component.element context={props.context} />
}
