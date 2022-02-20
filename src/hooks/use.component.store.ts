import { ElementTagNameMap, StoreUtils } from '@queelag/core'
import { useEffect, useMemo } from 'react'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ComponentStore } from '../modules/component.store'
import { Configuration } from '../modules/configuration'
import { useForceUpdate } from './use.force.update'
import { useID } from './use.id'
import { useSafeRef } from './use.safe.ref'

const KEYS: (keyof ComponentStore<any>)[] = ['id', 'layer', 'orientation', 'shape', 'size']

export const useComponentStore = <
  S extends ComponentStore<ElementTagNameMap[K]> = any,
  P extends ComponentStoreProps<ElementTagNameMap[K]> = any,
  K extends keyof ElementTagNameMap = any
>(
  Store: { new (props: P): S },
  props: P,
  keys: (keyof S & keyof P)[] = [],
  tagName: K = 'div' as K
): S => {
  const ref = useSafeRef(tagName)
  const update = useForceUpdate()
  const store = useMemo(() => new Store({ ...props, ref, update }), [])
  const id = useID(store.name, props.id, Configuration.isComponentStoreGeneratingIDOnConstruction ? store.id : undefined)

  useEffect(() => {
    store.id = id
    store.update()
  }, [id])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, [...(KEYS as any), ...keys], update)
  }, [props])

  useEffect(() => {
    props.getStore && props.getStore(store)
  }, [])

  return store
}
