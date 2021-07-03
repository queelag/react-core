import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName } from '../definitions/enums'
import { TopTabberProps } from '../definitions/props'
import { TopTabberItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

export class TopTabberStore extends ComponentStore<HTMLDivElement> {
  active: string
  items: TopTabberItem[]
  start: number

  constructor(active: string = '', id: ID = '', items: TopTabberItem[] = [], ref: MutableRefObject<HTMLDivElement>, update: () => void = noop) {
    super(ComponentName.TOP_TABBER, id, ref, update)

    this.active = active || items[0].name
    this.items = items
    this.start = 0
  }

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

export const TOP_TABBER_STORE_KEYS: (keyof TopTabberProps & keyof TopTabberStore)[] = ['active', 'id', 'items']
