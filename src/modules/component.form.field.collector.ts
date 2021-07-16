import { WithIdentity } from '@queelag/core'
import { ComponentFormFieldStore } from './component.form.field.store'

/**
 * @category Module
 */
export class ComponentFormFieldCollector<T extends Element, U extends WithIdentity, V extends ComponentFormFieldStore<T, U>> {
  data: Map<string, V>
  dummy: V

  constructor(dummy: V) {
    this.data = new Map()
    this.dummy = dummy
  }

  setAndReturnDelete(store: V): () => void {
    this.set(store)
    return () => this.delete(store)
  }

  set(store: V): void {
    this.data.set(store.id, store)
    this.data.set(this.toKey(store.store, store.path), store)
  }

  get(id: string): V
  get(store: U, path: string): V
  get(...args: any[]): V {
    switch (true) {
      case typeof args[0] === 'string':
        return this.data.get(args[0]) || this.dummy
      case typeof args[0] === 'object' && typeof args[1] === 'string':
        return this.data.get(this.toKey(args[0], args[1])) || this.dummy
      default:
        return this.dummy
    }
  }

  delete(store: V): void {
    this.data.delete(store.id)
    this.data.delete(this.toKey(store.store, store.path))
  }

  private toKey(store: U, path: keyof U): string {
    return store['id'] + '_' + path
  }
}
