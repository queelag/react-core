import { Observer } from 'mobx-react'
import React from 'react'

export const useObserver = (fn: () => JSX.Element) => <Observer>{() => fn()}</Observer>
