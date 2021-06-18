import { ComponentName } from '../definitions/enums'
import { ComponentStore } from '../modules/component.store'

export class ListStore<T> extends ComponentStore<HTMLDivElement> {
  items: T[]

  constructor(items: T[]) {
    super(ComponentName.LIST)

    this.items = items
  }

  get hasItems(): boolean {
    return this.items.length > 0
  }

  get isItemsEmpty(): boolean {
    return this.items.length <= 0
  }
}
