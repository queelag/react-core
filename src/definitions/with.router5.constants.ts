import { BottomSheetProps, BottomTabberProps, ContextMenuProps, HeaderProps, RouterRendererProps, SidebarProps, TopTabberProps } from './with.router5.props'

/** @category Constant */
export const BOTTOM_SHEET_PROPS_KEYS: (keyof BottomSheetProps)[] = ['items', 'title']
/** @category Constant */
export const BOTTOM_TABBER_PROPS_KEYS: (keyof BottomTabberProps)[] = ['items', 'router']
/** @category Constant */
export const CONTEXT_MENU_PROPS_KEYS: (keyof ContextMenuProps)[] = ['items']
/** @category Constant */
export const HEADER_PROPS_KEYS: (keyof HeaderProps)[] = ['logo', 'router', 'title']
/** @category Constant */
export const ROUTER_RENDERER_PROPS_KEYS: (keyof RouterRendererProps)[] = ['fallback', 'map']
/** @category Constant */
export const SIDEBAR_PROPS_KEYS: (keyof SidebarProps)[] = ['footer', 'items', 'router']
/** @category Constant */
export const TOP_TABBER_PROPS_KEYS: (keyof TopTabberProps)[] = ['active', 'items']
