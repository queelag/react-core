import { ElementTagNameMap } from '@queelag/core'
import { useEffect } from 'react'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { useComponentStore } from './use.component.store'

const KEYS: (keyof ComponentFormFieldStore<any, any>)[] = ['disabled', 'label', 'layer', 'path', 'required', 'schema', 'store', 'touched']

export const useComponentFormFieldStore = <
  S extends ComponentFormFieldStore<ElementTagNameMap[K], O> = any,
  P extends ComponentFormFieldStoreProps<ElementTagNameMap[K], O> = any,
  O extends object = any,
  K extends keyof ElementTagNameMap = any
>(
  Store: { new (props: P): S },
  props: P,
  Collector: ComponentFormFieldCollector<ElementTagNameMap[K], O, S>,
  keys: (keyof S & keyof P)[] = [],
  tagName: K = 'div' as K
): S => {
  const store = useComponentStore(Store, props, [...(KEYS as any), ...keys], tagName)

  Collector.set(store)
  useEffect(() => {
    Collector.set(store)
    return () => Collector.delete(store)
  }, [store.store, store.path])

  return store
}
