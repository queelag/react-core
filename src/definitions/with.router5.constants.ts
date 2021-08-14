import { BottomTabberStore } from '../stores/bottom.tabber.store'
import { SidebarStore } from '../stores/sidebar.store'
import { TopTabberStore } from '../stores/top.tabber.store'
import { BottomSheetProps, BottomTabberProps, ContextMenuProps, HeaderProps, RouterRendererProps, SidebarProps, TopTabberProps } from './with.router5.props'

/** @category Constant */
export const BOTTOM_SHEET_PROPS_KEYS: (keyof BottomSheetProps)[] = ['header', 'items', 'title']

/** @category Constant */
export const BOTTOM_TABBER_PROPS_KEYS: (keyof BottomTabberProps)[] = ['items', 'router']

/** @category Constant */
export const BOTTOM_TABBER_STORE_KEYS: (keyof BottomTabberProps & keyof BottomTabberStore)[] = ['items', 'router']

/** @category Constant */
export const CONTEXT_MENU_PROPS_KEYS: (keyof ContextMenuProps)[] = ['items']

/** @category Constant */
export const HEADER_PROPS_KEYS: (keyof HeaderProps)[] = ['logo', 'router', 'title']

/** @category Constant */
export const ROUTER_RENDERER_PROPS_KEYS: (keyof RouterRendererProps)[] = ['context', 'fallback', 'map']

/** @category Constant */
export const SIDEBAR_PROPS_KEYS: (keyof SidebarProps)[] = ['footer', 'items', 'router']
/** @category Constant */
export const SIDEBAR_STORE_KEYS: (keyof SidebarProps & keyof SidebarStore)[] = ['items', 'router']

/** @category Constant */
export const TOP_TABBER_PROPS_KEYS: (keyof TopTabberProps)[] = ['activeItemName', 'items']

/** @category Constant */
export const TOP_TABBER_STORE_KEYS: (keyof TopTabberProps & keyof TopTabberStore)[] = ['activeItemName', 'items']
