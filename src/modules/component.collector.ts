import { ComponentStore } from './component.store'

export class ComponentCollector<T extends ComponentStore<any>> {
  data: Map<string, T> = new Map()
  dummy: T

  constructor(dummy: T) {
    this.dummy = dummy
  }

  setAndReturnDelete(store: T): () => void {
    this.set(store)
    return () => this.delete(store)
  }

  set(store: T): void {
    this.data.set(store.name, store)
  }

  get(name: string): T {
    return this.data.get(name) || this.dummy
  }

  delete(store: T): void {
    this.data.delete(store.name)
  }
}
