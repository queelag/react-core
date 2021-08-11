import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ListProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for List stores, handles items.
 *
 * @category Store
 */
export class ListStore<T> extends ComponentStore<HTMLUListElement> {
  /**
   * An array of T.
   */
  items: T[]

  constructor(props: ListProps<T> & ComponentStoreProps<HTMLUListElement>) {
    super(ComponentName.LIST, props)

    this.items = props.items
  }

  get hasItems(): boolean {
    return this.items.length > 0
  }

  get isItemsEmpty(): boolean {
    return this.items.length <= 0
  }
}
