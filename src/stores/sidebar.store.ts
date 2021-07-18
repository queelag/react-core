import { Router } from 'router5'
import { ComponentName } from '../definitions/enums'
import { ComponentProps } from '../definitions/props'
import { SidebarItem } from '../definitions/types'
import { SidebarProps } from '../definitions/with.router5.props'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * An abstraction for Sidebar stores, handles items and navigation.
 *
 * @category Store
 */
export class SidebarStore extends ComponentStore<HTMLDivElement> {
  /**
   * An array of {@link SidebarItem}.
   */
  items: SidebarItem[]
  /**
   * A router5 instance.
   */
  router: Router

  constructor(props: SidebarProps & ComponentProps<HTMLDivElement>) {
    super(ComponentName.SIDEBAR, props)

    this.items = props.items
    this.router = props.router
  }

  /**
   * Navigates to the item route.
   */
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
