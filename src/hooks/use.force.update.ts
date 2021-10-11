import { useReducer } from 'react'

/**
 * Forces a re-render.
 *
 * @category Hook
 */
export function useForceUpdate(): () => void {
  return useReducer(() => ({}), {})[1]
}
