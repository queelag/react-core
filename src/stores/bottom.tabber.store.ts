import { RouteContext } from 'react-router5/dist/types'
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
   * A router5 context.
   */
  context: RouteContext
  /**
   * An array of {@link BottomTabberItem}.
   */
  items: BottomTabberItem[]

  constructor(props: BottomTabberProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.BOTTOM_TABBER, props)

    this.context = props.context
    this.items = props.items
  }

  /**
   * Navigates to the item route.
   */
  onClickItem(item: BottomTabberItem): void {
    this.context.router.navigate(item.route.name, item.route.params || {}, { ...item.route.options, replace: true })
  }

  findItemByName(name: string): BottomTabberItem {
    return this.items.find((v: BottomTabberItem) => v.route.name === name) || this.dummyItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: BottomTabberItem) => v.route.name === name)
  }

  isItemActive(item: BottomTabberItem): boolean {
    return item.route.name === this.context.route.name
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
