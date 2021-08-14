import type { RouteContext } from 'react-router5/dist/types'
import type { Router } from 'router5'
import { WithHeader, WithTitle } from './interfaces'
import { HTMLDivProps } from './props'
import { BottomSheetItem, BottomTabberItem, ContextMenuItem, SidebarItem, TopTabberItem } from './with.router5.interfaces'

/** @category Prop */
export interface BottomSheetProps extends HTMLDivProps, WithHeader, WithTitle {
  items?: BottomSheetItem[]
}

/** @category Prop */
export interface BottomTabberProps extends HTMLDivProps {
  items: BottomTabberItem[]
  router: Router
}

/** @category Prop */
export interface ContextMenuProps extends HTMLDivProps {
  items: ContextMenuItem[]
}

/** @category Prop */
export interface HeaderProps extends HTMLDivProps {
  logo?: JSX.Element
  router: Router
  title?: string
}

/** @category Prop */
export interface RouterRendererProps extends HTMLDivProps {
  context: RouteContext
  fallback?: (props: { context: RouteContext }) => JSX.Element
  map: Map<string, (props: { context: RouteContext }) => JSX.Element>
}

/** @category Prop */
export interface SidebarProps extends HTMLDivProps {
  footer?: JSX.Element
  items: SidebarItem[]
  router: Router
}

/** @category Prop */
export interface TopTabberProps extends HTMLDivProps {
  activeItemName?: string
  items: TopTabberItem[]
}
