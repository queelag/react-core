import { ReactNode } from 'react'
import type { RouteContext } from 'react-router5/dist/types'
import type { Options } from 'router5'
import type { Params } from 'router5/dist/types/base'
import { WithColor, WithDescription, WithIcon, WithTitle } from './interfaces'

export interface BottomSheetItem extends WithColor, WithDescription, WithIcon, WithRoute, WithTitle {
  onClick?: () => any
}

export interface BottomTabberItem extends WithIcon, Required<WithRoute> {}

export interface ContextMenuItem extends WithIcon, WithRoute, WithTitle {
  onClick?: () => any
}

export interface SidebarItem extends WithIcon, Required<WithRoute> {}

export interface TopTabberItem {
  component: ReactNode
  name: string
}

export interface WithRoute {
  route?: {
    name: string
    options?: Options
    params?: Params
  }
}

export interface WithRouterContext {
  context: RouteContext
}
