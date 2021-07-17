import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo, useRef } from 'react'
import { FixedSizeList, Layout, ListChildComponentProps } from 'react-window'
import { VIRTUALIZED_LIST_PROPS_KEYS } from '../definitions/constants'
import { VirtualizedListProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { VirtualizedListStore, VIRTUALIZED_LIST_STORE_KEYS } from '../stores/virtualized.list.store'

/**
 * A virtualized unordered list, handles sizes and empty states.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { VirtualizedList } from '@queelag/react-core'
 *
 * function App() {
 *   return <VirtualizedList dummy={() => <li>0</li>} items={[0, 1]} renderItem={(v: number) => <li key={v}>{v}</li>} />
 * }
 * ```
 *
 * @category Component
 */
export function VirtualizedList<T>(props: VirtualizedListProps<T>) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('ul'))
  const dummyRef = useRef(document.createElement('div'))
  const store = useMemo(() => new VirtualizedListStore({ ...props, dummyRef, ref, update }), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, VIRTUALIZED_LIST_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, VIRTUALIZED_LIST_STORE_KEYS))

  useEffect(() => {
    store.readItemElementHeightOrWidth()
    store.readParentElementHeightOrWidth()
  }, [])

  useEffect(() => {
    let listener: () => void

    listener = () => update()
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  return (
    <ul
      {...ObjectUtils.omit(props, VIRTUALIZED_LIST_PROPS_KEYS)}
      id={store.id}
      ref={ref}
      style={{
        ...props.style,
        overflow: 'hidden'
      }}
    >
      {store.isItemsEmpty && props.empty && <props.empty />}
      {store.hasItems && (
        <FixedSizeList
          height={store.elementHeight}
          itemCount={store.items.length}
          itemKey={store.itemKey}
          itemSize={store.itemElementHeight}
          layout={store.orientation.toLowerCase() as Layout}
          width={store.elementWidth}
        >
          {({ index, style }: ListChildComponentProps) => (
            <div {...props.itemParentProps} style={{ ...props.itemParentProps?.style, ...style }}>
              <li>{props.renderItem(store.items[index], index)}</li>
            </div>
          )}
        </FixedSizeList>
      )}
      <div ref={dummyRef} style={{ left: 0, opacity: 0, pointerEvents: 'none', position: 'absolute', top: 0 }}>
        {props.dummy}
      </div>
    </ul>
  )
}
