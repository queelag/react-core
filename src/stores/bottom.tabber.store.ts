import { Router } from 'router5'
import { ComponentName } from '../definitions/enums'
import { BottomTabberProps, ComponentProps } from '../definitions/props'
import { BottomTabberItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * An abstraction for BottomTabber stores, handles items and router navigation.
 *
 * @category Store
 */
export class BottomTabberStore extends ComponentStore<HTMLDivElement> {
  /**
   * An array of {@link BottomTabberItem}.
   */
  items: BottomTabberItem[]
  /**
   * A router5 instance.
   */
  router: Router

  constructor(props: BottomTabberProps & ComponentProps<HTMLDivElement>) {
    super(ComponentName.BOTTOM_TABBER, props)

    this.items = props.items
    this.router = props.router
  }

  /**
   * Navigates to the item route.
   */
  onClickItem(item: BottomTabberItem): void {
    this.router.navigate(item.name)
  }

  findItemByName(name: string): BottomTabberItem {
    return this.items.find((v: BottomTabberItem) => v.name === name) || Dummy.bottomTabberItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: BottomTabberItem) => v.name === name)
  }
}

/** @category Constant */
export const BOTTOM_TABBER_STORE_KEYS: (keyof BottomTabberProps & keyof BottomTabberStore)[] = ['id', 'items', 'router']
