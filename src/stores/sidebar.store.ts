import { Router } from 'router5'
import { Blank } from '../components/Blank'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { SidebarItem } from '../definitions/with.router5.interfaces'
import { SidebarProps } from '../definitions/with.router5.props'
import { ComponentStore } from '../modules/component.store'

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

  constructor(props: SidebarProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.SIDEBAR, props)

    this.items = props.items
    this.router = props.router
  }

  /**
   * Navigates to the item route.
   */
  onClickItem(item: SidebarItem): void {
    this.router.navigate(item.route.name, item.route.params || {}, item.route.options || {})
  }

  findItemByName(name: string): SidebarItem {
    return this.items.find((v: SidebarItem) => v.route.name === name) || this.dummyItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: SidebarItem) => v.route.name === name)
  }

  private get dummyItem(): SidebarItem {
    return {
      icon: Blank,
      route: {
        name: ''
      }
    }
  }
}

/** @category Constant */
export const SIDEBAR_STORE_KEYS: (keyof SidebarProps & keyof SidebarStore)[] = ['id', 'items', 'router']
