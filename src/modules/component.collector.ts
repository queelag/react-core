import { ID } from '@queelag/core'
import { ComponentStore } from './component.store'

/**
 * @category Module
 */
export class ComponentCollector<T extends ComponentStore<any>> {
  data: Map<ID, T> = new Map()
  dummy: T

  constructor(dummy: T) {
    this.dummy = dummy
  }

  setAndReturnDelete(store: T): () => void {
    this.set(store)
    return () => this.delete(store)
  }

  set(store: T): void {
    this.data.set(store.id, store)
  }

  get(id: ID): T {
    return this.data.get(id) || this.dummy
  }

  delete(store: T): void {
    this.data.delete(store.id)
  }
}
