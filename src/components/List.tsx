import { ObjectUtils } from '@queelag/core'
import React, { ForwardedRef } from 'react'
import { LIST_PROPS_KEYS, LIST_STORE_KEYS } from '../definitions/constants'
import { ListProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { forwardRef } from '../modules/forward.ref'
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
export const List = forwardRef(<T extends any>(props: ListProps<T>, ref: ForwardedRef<HTMLUListElement>) => {
  const store = useComponentStore<ListStore<T>>(ListStore, props, LIST_STORE_KEYS, 'ul')

  return (
    <ul {...ObjectUtils.omit(props, LIST_PROPS_KEYS)} id={store.id} ref={ref}>
      {store.isItemsEmpty && props.empty && <props.empty />}
      {store.hasItems && store.items.map(store.renderItem)}
      {props.children}
    </ul>
  )
})
