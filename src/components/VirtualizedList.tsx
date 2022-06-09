import { ObjectUtils } from '@queelag/core'
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

  const onItemsRendered = () => {
    if (innerRef.current.className === props.innerClassName) {
      return
    }

    innerRef.current.className = props.innerClassName || ''
  }

  useEffect(() => {
    store.readItemElementHeightOrWidth()
    store.readParentElementHeightOrWidth()
  }, [])

  useEffect(() => {
    let listener: () => void

    listener = () => {
      store.readItemElementHeightOrWidth()
      store.readParentElementHeightOrWidth()
    }
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  return (
    <ul
      {...ObjectUtils.omit(props, VIRTUALIZED_LIST_PROPS_KEYS)}
      id={store.id}
      ref={store.ref}
      style={{
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
          onItemsRendered={onItemsRendered}
          width={store.elementWidth}
        >
          {({ index, style }: ListChildComponentProps) => (
            <div {...props.itemParentProps} style={{ ...props.itemParentProps?.style, ...style }}>
              {store.renderItem(store.items[index], index)}
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
