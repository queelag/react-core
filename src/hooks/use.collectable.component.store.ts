import { ElementTagNameMap } from '@queelag/core'
import { useEffect } from 'react'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ComponentCollector } from '../modules/component.collector'
import { ComponentStore } from '../modules/component.store'
import { useComponentStore } from './use.component.store'

export const useCollectableComponentStore = <
  S extends ComponentStore<ElementTagNameMap[K]> = any,
  P extends ComponentStoreProps<ElementTagNameMap[K]> = any,
  K extends keyof ElementTagNameMap = any
>(
  Store: { new (props: P): S },
  props: P,
  Collector: ComponentCollector<S>,
  keys: (keyof S & keyof P)[] = [],
  tagName: K = 'div' as K
): S => {
  const store = useComponentStore(Store, props, keys, tagName)

  Collector.set(store)
  useEffect(() => {
    Collector.set(store)
    return () => Collector.delete(store)
  }, [store.id])

  return store
}
