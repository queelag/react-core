import { RouteContext } from 'react-router5/dist/types'
import { Router } from 'router5'
import { HTMLDivProps } from './props'
import { BottomTabberItem, SidebarItem } from './types'

/** @category Prop */
export type BottomTabberProps = {
  items: BottomTabberItem[]
  router: Router
} & HTMLDivProps

/** @category Prop */
export type HeaderProps = {
  logo?: JSX.Element
  router: Router
  title?: string
} & HTMLDivProps

/** @category Prop */
export type RouterRendererProps = {
  context: RouteContext
  fallback?: (props: { context: RouteContext }) => JSX.Element
  map: Map<string, (props: { context: RouteContext }) => JSX.Element>
} & HTMLDivProps

/** @category Prop */
export type SidebarProps = {
  footer?: JSX.Element
  items: SidebarItem[]
  router: Router
} & HTMLDivProps
