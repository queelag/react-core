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
export class BottomTabberStore<T> extends ComponentStore {
  /**
   * An array of {@link BottomTabberItem}.
   */
  items: BottomTabberItem<T>[]

  constructor(props: BottomTabberProps<T> & ComponentStoreProps) {
    super(ComponentName.BOTTOM_TABBER, props)

    this.isItemActive = props.isItemActive || noop
    this.items = props.items || []
    this.onClickItem = props.onClickItem || noop
  }

  onClickItem(item: BottomTabberItem<T>): any {}

  isItemActive(item: BottomTabberItem<T>): boolean {
    return false
  }

  get activeItem(): BottomTabberItem<T> {
    return this.items.find((v: BottomTabberItem<T>) => this.isItemActive(v)) || this.dummyItem
  }

  get activeItemIndex(): number {
    return this.items.findIndex((v: BottomTabberItem<T>) => this.isItemActive(v))
  }

  private get dummyItem(): BottomTabberItem<T> {
    return {
      icon: Blank,
      route: undefined as any
    }
  }
}
