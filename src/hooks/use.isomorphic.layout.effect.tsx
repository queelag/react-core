import { SSR } from '@queelag/core'
import { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react'

export const useIsomorphicLayoutEffect = (effect: EffectCallback, deps?: DependencyList) => {
  return SSR.hasDOM ? useLayoutEffect(effect, deps) : useEffect(effect, deps)
}
