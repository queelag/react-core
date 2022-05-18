import { useReducer } from 'react'
import { ComponentLifeCycle } from '../definitions/enums'
import { useLifeCycle } from './use.life.cycle'

/**
 * Forces a re-render.
 *
 * @category Hook
 */
export function useForceUpdate(): () => void {
  const cycle = useLifeCycle()
  const reducer = useReducer(() => ({}), {})

  const dispatch = () => {
    switch (cycle) {
      case ComponentLifeCycle.CONSTRUCTED:
      case ComponentLifeCycle.UNMOUNTED:
        break
      case ComponentLifeCycle.MOUNTED:
        return reducer[1]()
    }
  }

  return dispatch
}
