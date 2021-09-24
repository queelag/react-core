import { RouteContext } from 'react-router5/dist/types'
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
   * A router5 context.
   */
  context: RouteContext
  /**
   * An array of {@link SidebarItem}.
   */
  items: SidebarItem[]

  constructor(props: SidebarProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.SIDEBAR, props)

    this.context = props.context
    this.items = props.items
  }

  /**
   * Navigates to the item route.
   */
  onClickItem(item: SidebarItem): void {
    this.context.router.navigate(item.route.name, item.route.params || {}, { ...item.route.options, replace: true })
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
