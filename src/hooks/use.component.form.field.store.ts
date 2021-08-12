import { ElementTagNameMap } from '@queelag/core'
import { useEffect } from 'react'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { useComponentStore } from './use.component.store'

const KEYS: (keyof ComponentFormFieldStore<any, any>)[] = ['disabled', 'label', 'layer', 'path', 'required', 'schema', 'store', 'touched']

export const useComponentFormFieldStore = <
  K extends keyof ElementTagNameMap,
  U extends object,
  V extends ComponentFormFieldStore<ElementTagNameMap[K], U>,
  W extends ComponentFormFieldStoreProps<ElementTagNameMap[K], U>
>(
  Store: { new (props: W): V },
  props: W,
  Collector: ComponentFormFieldCollector<ElementTagNameMap[K], U, V>,
  keys: (keyof V & keyof W)[] = [],
  tagName: K = 'div' as K
): V => {
  const store = useComponentStore(Store, props, [...(KEYS as any), ...keys], tagName)

  Collector.set(store)
  useEffect(() => {
    Collector.set(store)
    return () => Collector.delete(store)
  }, [store.store, store.path])

  return store
}
