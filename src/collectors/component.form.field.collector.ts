import { ComponentFormFieldStore } from '../modules/component.form.field.store'

class ComponentFormFieldCollector<T extends ComponentFormFieldStore<any, any>> {
  data: Map<string, T>
  dummy: T

  constructor(dummy: T) {
    this.data = new Map()
    this.dummy = dummy
  }

  setAndReturnDelete(store: T): () => void {
    this.set(store)
    return () => this.delete(store)
  }

  set(store: T): void {
    this.data.set(store.id, store)
    this.data.set(this.toKey(store.store, store.path), store)
  }

  get(id: string): T
  get<U extends object>(store: U, path: string): T
  get(...args: any[]): T {
    switch (true) {
      case typeof args[0] === 'string':
        return this.data.get(args[0]) || this.dummy
      case typeof args[0] === 'object' && typeof args[1] === 'string':
        return this.data.get(this.toKey(args[0], args[1])) || this.dummy
      default:
        return this.dummy
    }
  }

  delete(store: T): void {
    this.data.delete(store.id)
    this.data.delete(this.toKey(store.store, store.path))
  }

  private toKey(store: T, path: string): string {
    return store['id'] + '_' + path
  }
}

export default ComponentFormFieldCollector
