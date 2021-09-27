import { ObjectUtils } from '@queelag/core'
import React from 'react'
import { LIST_PROPS_KEYS, LIST_STORE_KEYS } from '../definitions/constants'
import { ListProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { ListStore } from '../stores/list.store'

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
  const store = useComponentStore(ListStore, props, LIST_STORE_KEYS as any, 'ul')

  return (
    <ul {...ObjectUtils.omit(props, LIST_PROPS_KEYS)} id={store.id}>
      {store.isItemsEmpty && props.empty && <props.empty />}
      {store.hasItems && store.items.map(props.renderItem)}
      {props.children}
    </ul>
  )
}
