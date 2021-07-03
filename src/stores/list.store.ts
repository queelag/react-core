import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName } from '../definitions/enums'
import { ListProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

export class ListStore<T> extends ComponentStore<HTMLUListElement> {
  items: T[]

  constructor(id: ID = '', items: T[], ref: MutableRefObject<HTMLUListElement> = Dummy.ref, update: () => void = noop) {
    super(ComponentName.LIST, id, ref, update)

    this.items = items
  }

  get hasItems(): boolean {
    return this.items.length > 0
  }

  get isItemsEmpty(): boolean {
    return this.items.length <= 0
  }
}

export const LIST_STORE_KEYS: (keyof ListProps<any> & keyof ListStore<any>)[] = ['id', 'items']
