import { Blank } from '../components/Blank'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { TopTabberItem } from '../definitions/with.router5.interfaces'
import { TopTabberProps } from '../definitions/with.router5.props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for TopTabber stores, handles cursors and items.
 *
 * @category Store
 */
export class TopTabberStore extends ComponentStore<HTMLDivElement> {
  /**
   * A string which determines the active item name.
   */
  active: string
  /**
   * An array of {@link TopTabberItem}.
   */
  items: TopTabberItem[]

  constructor(props: TopTabberProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.TOP_TABBER, props)

    this.active = props.active || props.items[0].name
    this.items = props.items
  }

  /**
   * Sets item as active.
   */
  onClickItem(item: TopTabberItem): void {
    this.active = item.name
    this.update()
  }

  findItemByName(name: string): TopTabberItem {
    return this.items.find((v: TopTabberItem) => v.name === name) || this.dummyItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: TopTabberItem) => v.name === name)
  }

  findPreviousItem(name: string): TopTabberItem {
    return this.items[this.findItemIndexByName(name) - 1] || this.items[0]
  }

  findNextItem(name: string): TopTabberItem {
    return this.items[this.findItemIndexByName(name) + 1] || this.items[this.items.length - 1]
  }

  private get dummyItem(): TopTabberItem {
    return {
      component: Blank,
      name: ''
    }
  }
}

/** @category Constant */
export const TOP_TABBER_STORE_KEYS: (keyof TopTabberProps & keyof TopTabberStore)[] = ['active', 'id', 'items']
