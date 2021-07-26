import type { ListChildComponentProps } from 'react-window'

/** @category Prop */
export interface VirtualizedListItemProps<T> extends ListChildComponentProps {
  renderItem: (v: T, k: number) => JSX.Element
}
