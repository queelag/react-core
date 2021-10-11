import { WithFooter, WithHeader, WithTitle } from './interfaces'
import { HTMLDivProps } from './props'
import { BottomSheetItem, BottomTabberItem, ContextMenuItem, SidebarItem, TopTabberItem, WithRouterContext } from './with.router5.interfaces'

/** @category Prop */
export interface BottomSheetProps extends HTMLDivProps, WithHeader, WithTitle {
  items?: BottomSheetItem[]
}

/** @category Prop */
export interface BottomTabberProps extends HTMLDivProps, WithRouterContext {
  items: BottomTabberItem[]
}

/** @category Prop */
export interface ContextMenuProps extends HTMLDivProps {
  items: ContextMenuItem[]
}

/** @category Prop */
export interface HeaderProps extends HTMLDivProps, WithRouterContext {
  logo?: JSX.Element
  title?: string
}

/** @category Prop */
export interface RouterRendererProps extends HTMLDivProps, WithRouterContext {
  fallback?: () => JSX.Element
  map: Map<string, () => JSX.Element>
}

/** @category Prop */
export interface SidebarProps extends HTMLDivProps, WithFooter, WithHeader, WithRouterContext, WithTitle {
  items: SidebarItem[]
}

/** @category Prop */
export interface TopTabberProps extends HTMLDivProps {
  activeItemName?: string
  items: TopTabberItem[]
}
