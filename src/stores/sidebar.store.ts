import { noop } from '@queelag/core'
import { Blank } from '../components/Blank'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps, SidebarItem } from '../definitions/interfaces'
import { SidebarProps } from '../definitions/props'
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

  constructor(props: SidebarProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.SIDEBAR, props)

    this.isItemActive = props.isItemActive || noop
    this.items = props.items
    this.onClickItem = props.onClickItem || noop
  }

  onClickItem(item: SidebarItem): any {}

  isItemActive(item: SidebarItem): boolean {
    return false
  }

  get activeItem(): SidebarItem {
    return this.items.find((v: SidebarItem) => this.isItemActive(v)) || this.dummyItem
  }

  get activeItemIndex(): number {
    return this.items.findIndex((v: SidebarItem) => this.isItemActive(v))
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
