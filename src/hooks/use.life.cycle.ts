import { MutableRefObject, useEffect, useRef } from 'react'
import { ComponentLifeCycle } from '../definitions/enums'

/**
 * Returns the life cycle of a component.
 *
 * @category Hook
 */
export function useLifeCycle(): MutableRefObject<ComponentLifeCycle> {
  const value = useRef<ComponentLifeCycle>(ComponentLifeCycle.CONSTRUCTED)

  useEffect(() => {
    value.current = ComponentLifeCycle.MOUNTED
    return () => {
      value.current = ComponentLifeCycle.UNMOUNTED
    }
  })

  return value
}
