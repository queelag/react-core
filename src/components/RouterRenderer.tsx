import React from 'react'
import { RouterRendererProps } from '../definitions/props'

/**
 * @category Component
 */
export function RouterRenderer(props: RouterRendererProps) {
  const component = { element: props.map.get(props.context.route.name) || props.fallback || (() => <div />) }
  return <component.element context={props.context} />
}
