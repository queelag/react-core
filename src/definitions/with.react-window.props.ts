import { ListChildComponentProps } from 'react-window'

/** @category Prop */
export type VirtualizedListItemProps<T> = {
  renderItem: (v: T, k: number) => JSX.Element
} & ListChildComponentProps
