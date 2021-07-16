import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import createRouter, { Router } from 'router5'
import { ComponentName } from '../definitions/enums'
import { SidebarProps } from '../definitions/props'
import { SidebarItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * @category Store
 */
export class SidebarStore extends ComponentStore<HTMLDivElement> {
  items: SidebarItem[]
  router: Router

  constructor(
    id: ID = '',
    items: SidebarItem[] = [],
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    router: Router = createRouter(),
    update: () => void = noop
  ) {
    super(ComponentName.SIDEBAR, id, ref, update)

    this.items = items
    this.router = router
  }

  onClickItem(item: SidebarItem): void {
    this.router.navigate(item.name)
  }

  findItemByName(name: string): SidebarItem {
    return this.items.find((v: SidebarItem) => v.name === name) || Dummy.sidebarItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: SidebarItem) => v.name === name)
  }
}

/** @category Constant */
export const SIDEBAR_STORE_KEYS: (keyof SidebarProps & keyof SidebarStore)[] = ['id', 'items', 'router']
