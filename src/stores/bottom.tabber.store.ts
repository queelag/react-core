import { Router } from 'router5'
import { Blank } from '../components/Blank'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { BottomTabberItem } from '../definitions/with.router5.interfaces'
import { BottomTabberProps } from '../definitions/with.router5.props'
import { ComponentStore } from '../modules/component.store'

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

  constructor(props: BottomTabberProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.BOTTOM_TABBER, props)

    this.items = props.items
    this.router = props.router
  }

  /**
   * Navigates to the item route.
   */
  onClickItem(item: BottomTabberItem): void {
    this.router.navigate(item.route.name, item.route.params || {}, item.route.options || {})
  }

  findItemByName(name: string): BottomTabberItem {
    return this.items.find((v: BottomTabberItem) => v.route.name === name) || this.dummyItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: BottomTabberItem) => v.route.name === name)
  }

  private get dummyItem(): BottomTabberItem {
    return {
      icon: Blank,
      route: {
        name: ''
      }
    }
  }
}

/** @category Constant */
export const BOTTOM_TABBER_STORE_KEYS: (keyof BottomTabberProps & keyof BottomTabberStore)[] = ['id', 'items', 'router']
