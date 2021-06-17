import { ID, IDUtils, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Dummy } from './dummy'

export class ComponentStore<T extends HTMLElement> {
  id: ID
  name: string
  ref: MutableRefObject<T>

  constructor(name: string, id: ID = IDUtils.prefixed(name), ref: MutableRefObject<T> = Dummy.ref, update: () => void = noop) {
    this.id = id
    this.name = name
    this.ref = ref
    this.update = update
  }

  update(): void {}

  get element(): T {
    return this.ref.current
  }
}
