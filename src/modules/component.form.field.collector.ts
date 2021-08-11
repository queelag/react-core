import { ID } from '@queelag/core'
import { ComponentFormFieldStore } from './component.form.field.store'

/**
 * @category Module
 */
export class ComponentFormFieldCollector<T extends Element, U extends object, V extends ComponentFormFieldStore<T, U>> {
  data: { byID: Map<ID, V>; byStore: Map<U, Map<number | string | symbol, V>> }
  dummy: V

  constructor(dummy: V) {
    this.data = { byID: new Map(), byStore: new Map() }
    this.dummy = dummy
  }

  setAndReturnDelete(store: V): () => void {
    this.set(store)
    return () => this.delete(store)
  }

  set(store: V): void {
    let entry: Map<number | string | symbol, V> | undefined

    entry = this.data.byStore.get(store.store)
    if (!entry) {
      this.data.byStore.set(store.store, new Map())
      return this.set(store)
    }

    entry.set(store.path, store)
    this.data.byID.set(store.id, store)
  }

  get(id: ID): V
  get(store: U, path: string): V
  get(...args: any[]) {
    switch (typeof args[0]) {
      case 'string':
        return this.data.byID.get(args[0])
      case 'object':
        let entry: Map<number | string | symbol, V> | undefined

        entry = this.data.byStore.get(args[0])
        if (!entry) return this.dummy

        return entry.get(args[1]) || this.dummy
    }
  }

  delete(store: V): void {
    let entry: Map<number | string | symbol, V> | undefined

    this.data.byID.delete(store.id)

    entry = this.data.byStore.get(store.store)
    if (!entry) return

    entry.delete(store.path)
  }
}
