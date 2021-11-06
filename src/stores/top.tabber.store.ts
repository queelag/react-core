import { Logger } from '@queelag/core'
import { Blank } from '../components/Blank'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps, TopTabberItem } from '../definitions/interfaces'
import { TopTabberProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for TopTabber stores, handles cursors and items.
 *
 * @category Store
 */
export class TopTabberStore extends ComponentStore {
  /**
   * A string which determines the active item name.
   */
  activeItemName: string
  /**
   * An array of {@link TopTabberItem}.
   */
  items: TopTabberItem[]

  constructor(props: TopTabberProps & ComponentStoreProps) {
    super(ComponentName.TOP_TABBER, props)

    this.activeItemName = props.activeItemName || props.items[0].name
    this.items = props.items
  }

  /**
   * Sets item as active.
   */
  onClickItem(item: TopTabberItem): void {
    this.activeItemName = item.name
    Logger.debug(this.id, 'onClickItem', `The active item name has been set to ${this.activeItemName}.`)

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

  get activeItem(): TopTabberItem {
    return this.findItemByName(this.activeItemName)
  }

  private get dummyItem(): TopTabberItem {
    return {
      component: Blank,
      name: ''
    }
  }
}
