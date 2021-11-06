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
export class SidebarStore<T> extends ComponentStore {
  /**
   * An array of {@link SidebarItem}.
   */
  items: SidebarItem<T>[]

  constructor(props: SidebarProps<T> & ComponentStoreProps) {
    super(ComponentName.SIDEBAR, props)

    this.isItemActive = props.isItemActive || noop
    this.items = props.items
    this.onClickItem = props.onClickItem || noop
  }

  onClickItem(item: SidebarItem<T>): any {}

  isItemActive(item: SidebarItem<T>): boolean {
    return false
  }

  get activeItem(): SidebarItem<T> {
    return this.items.find((v: SidebarItem<T>) => this.isItemActive(v)) || this.dummyItem
  }

  get activeItemIndex(): number {
    return this.items.findIndex((v: SidebarItem<T>) => this.isItemActive(v))
  }

  private get dummyItem(): SidebarItem<T> {
    return {
      icon: Blank,
      route: undefined as any
    }
  }
}
