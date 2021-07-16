import { Observer } from 'mobx-react'
import React from 'react'

/**
 * Observes a component.
 *
 * @category Hook
 */
export const useObserver = (fn: () => JSX.Element) => <Observer>{() => fn()}</Observer>
