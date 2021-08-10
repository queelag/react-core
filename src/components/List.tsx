import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { useEffect } from 'react'
import { LIST_PROPS_KEYS } from '../definitions/constants'
import { ListProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { ListStore, LIST_STORE_KEYS } from '../stores/list.store'

/**
 * An unordered list component, handles empty states and mapping.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { List } from '@queelag/react-core'
 *
 * function App() {
 *   return <List items={[0, 1]} renderItem={(v: number) => <li key={v}>{v}</li>} />
 * }
 * ```
 *
 * @category Component
 */
export function List<T>(props: ListProps<T>) {
  const store = useComponentStore(ListStore, props)

  useEffect(() => {
    StoreUtils.updateKeys(store, props, LIST_STORE_KEYS, store.update)
  }, ObjectUtils.pickToArray(props, LIST_STORE_KEYS))

  return (
    <ul {...ObjectUtils.omit(props, LIST_PROPS_KEYS)} id={store.id}>
      {store.isItemsEmpty && props.empty}
      {store.hasItems && store.items.map(props.renderItem)}
      {props.children}
    </ul>
  )
}
