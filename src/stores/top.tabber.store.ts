import { ComponentName } from '../definitions/enums'
import { ComponentProps, TopTabberProps } from '../definitions/props'
import { TopTabberItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

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

  constructor(props: TopTabberProps & ComponentProps<HTMLDivElement>) {
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
    return this.items.find((v: TopTabberItem) => v.name === name) || Dummy.topTabberItem
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
}

/** @category Constant */
export const TOP_TABBER_STORE_KEYS: (keyof TopTabberProps & keyof TopTabberStore)[] = ['active', 'id', 'items']
