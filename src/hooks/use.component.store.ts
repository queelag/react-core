import { ElementTagNameMap, StoreUtils } from '@queelag/core'
import { useEffect, useMemo } from 'react'
import { COMPONENT_STORE_KEYS } from '../definitions/constants'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ComponentStore } from '../modules/component.store'
import { useForceUpdate } from './use.force.update'
import { useID } from './use.id'
import { useSafeRef } from './use.safe.ref'

export const useComponentStore = <
  K extends keyof ElementTagNameMap,
  U extends ComponentStore<ElementTagNameMap[K]>,
  V extends ComponentStoreProps<ElementTagNameMap[K]>
>(
  Store: { new (props: V): U },
  props: V,
  keys: (keyof U & keyof V)[] = COMPONENT_STORE_KEYS,
  tagName: K = 'div' as K
): U => {
  const ref = useSafeRef(tagName)
  const update = useForceUpdate()
  const store = useMemo(() => new Store({ ...props, ref, update }), [])
  const id = useID(store.name, props.id)

  useEffect(() => {
    store.id = id
    store.update()
  }, [id])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, keys, update)
  })

  return store
}
