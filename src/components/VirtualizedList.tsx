import { NumberUtils, ObjectUtils } from '@queelag/core'
import React, { useEffect } from 'react'
import { FixedSizeList, Layout, ListChildComponentProps } from 'react-window'
import { VIRTUALIZED_LIST_PROPS_KEYS, VIRTUALIZED_LIST_STORE_KEYS } from '../definitions/constants'
import { VirtualizedListProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { useSafeRef } from '../hooks/use.safe.ref'
import { VirtualizedListStore } from '../stores/virtualized.list.store'

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
  const dummyRef = useSafeRef('div')
  const innerRef = useSafeRef('div')
  const store = useComponentStore<VirtualizedListStore<T>>(VirtualizedListStore, { ...props, dummyRef, innerRef }, VIRTUALIZED_LIST_STORE_KEYS, 'ul')

  useEffect(() => {
    store.readItemElementHeightOrWidth()
    store.readParentElementHeightOrWidth()
  }, [])

  useEffect(() => {
    let listener: () => void

    listener = () => store.update()
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  useEffect(() => {
    innerRef.current.className = props.innerClassName || ''
  }, [props.innerClassName, innerRef])

  return (
    <ul
      {...ObjectUtils.omit(props, VIRTUALIZED_LIST_PROPS_KEYS)}
      id={store.id}
      ref={store.ref}
      style={{
        height: typeof store.size === 'number' ? NumberUtils.limit(store.itemElementHeight * store.items.length, 0, store.size) : undefined,
        overflow: 'hidden',
        ...props.style
      }}
    >
      {store.isItemsEmpty && props.empty}
      {store.hasItems && (
        <FixedSizeList
          innerRef={innerRef}
          height={store.elementHeight}
          itemCount={store.items.length}
          itemKey={store.itemKey}
          itemSize={store.itemElementHeight}
          layout={store.orientation.toLowerCase() as Layout}
          width={store.elementWidth}
        >
          {({ index, style }: ListChildComponentProps) => (
            <div {...props.itemParentProps} style={{ ...props.itemParentProps?.style, ...style }}>
              <li>{store.renderItem(store.items[index], index)}</li>
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
