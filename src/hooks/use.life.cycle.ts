import { useEffect, useRef } from 'react'
import { ComponentLifeCycle } from '../definitions/enums'

export function useLifeCycle(): ComponentLifeCycle {
  const value = useRef<ComponentLifeCycle>(ComponentLifeCycle.CONSTRUCTED)

  useEffect(() => {
    value.current = ComponentLifeCycle.MOUNTED
    return () => {
      value.current = ComponentLifeCycle.UNMOUNTED
    }
  })

  return value.current
}
