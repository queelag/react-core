import { noop } from '@queelag/core'
import { Blank } from '../components/Blank'
import { ComponentName } from '../definitions/enums'
import { BottomTabberItem, ComponentStoreProps } from '../definitions/interfaces'
import { BottomTabberProps } from '../definitions/props'
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

  constructor(props: BottomTabberProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.BOTTOM_TABBER, props)

    this.isItemActive = props.isItemActive || noop
    this.items = props.items
    this.onClickItem = props.onClickItem || noop
  }

  onClickItem(item: BottomTabberItem): any {}

  isItemActive(item: BottomTabberItem): boolean {
    return false
  }

  get activeItem(): BottomTabberItem {
    return this.items.find((v: BottomTabberItem) => this.isItemActive(v)) || this.dummyItem
  }

  get activeItemIndex(): number {
    return this.items.findIndex((v: BottomTabberItem) => this.isItemActive(v))
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
