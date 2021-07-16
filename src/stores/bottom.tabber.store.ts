import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import createRouter, { Router } from 'router5'
import { ComponentName } from '../definitions/enums'
import { BottomTabberProps } from '../definitions/props'
import { BottomTabberItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * @category Store
 */
export class BottomTabberStore extends ComponentStore<HTMLDivElement> {
  items: BottomTabberItem[]
  router: Router

  constructor(
    id: ID = '',
    items: BottomTabberItem[] = [],
    name: string = ComponentName.BOTTOM_TABBER,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    router: Router = createRouter(),
    update: () => void = noop
  ) {
    super(name, id, ref, update)

    this.items = items
    this.router = router
  }

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
