import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName } from '../definitions/enums'
import { SidebarProps } from '../definitions/props'
import { SidebarItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'
import { RouterStore } from './router.store'

export class SidebarStore extends ComponentStore<HTMLDivElement> {
  items: SidebarItem[]
  router: RouterStore

  constructor(
    id: ID = '',
    items: SidebarItem[] = [],
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    router: RouterStore = new RouterStore(),
    update: () => void = noop
  ) {
    super(ComponentName.SIDEBAR, id, ref, update)

    this.items = items
    this.router = router
  }

  onClickItem(item: SidebarItem): void {
    this.router.goto(item.name, true)
  }

  findItemByName(name: string): SidebarItem {
    return this.items.find((v: SidebarItem) => v.name === name) || Dummy.sidebarItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: SidebarItem) => v.name === name)
  }
}

export const SIDEBAR_STORE_KEYS: (keyof SidebarProps & keyof SidebarStore)[] = ['id', 'items', 'router']
