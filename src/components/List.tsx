import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo, useRef } from 'react'
import { LIST_PROPS_KEYS } from '../definitions/constants'
import { ListProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { ListStore, LIST_STORE_KEYS } from '../stores/list.store'

/**
 * @category Component
 */
export function List<T>(props: ListProps<T>) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('ul'))
  const store = useMemo(() => new ListStore(props.id, props.items, ref, update), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, LIST_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, LIST_STORE_KEYS))

  return (
    <ul {...ObjectUtils.omit(props, LIST_PROPS_KEYS)} id={store.id}>
      {store.isItemsEmpty && props.empty}
      {store.hasItems && store.items.map(props.renderItem)}
      {props.children}
    </ul>
  )
}
