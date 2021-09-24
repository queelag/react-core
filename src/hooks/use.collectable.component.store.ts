import { ElementTagNameMap } from '@queelag/core'
import { useEffect } from 'react'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ComponentCollector } from '../modules/component.collector'
import { ComponentStore } from '../modules/component.store'
import { useComponentStore } from './use.component.store'

export const useCollectableComponentStore = <
  K extends keyof ElementTagNameMap,
  U extends ComponentStore<ElementTagNameMap[K]>,
  V extends ComponentStoreProps<ElementTagNameMap[K]>
>(
  Store: { new (props: V): U },
  props: V,
  Collector: ComponentCollector<U>,
  keys: (keyof U & keyof V)[] = [],
  tagName: K = 'div' as K
): U => {
  const store = useComponentStore(Store, props, keys, tagName)

  Collector.set(store)
  useEffect(() => {
    Collector.set(store)
    return () => Collector.delete(store)
  }, [store.id])

  return store
}
