import { ID, IDUtils, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Dummy } from './dummy'

/**
 * @category Module
 */
export class ComponentStore<T extends Element> {
  id: ID
  name: string
  ref: MutableRefObject<T>

  constructor(name: string, id: ID = '', ref: MutableRefObject<T> = Dummy.ref, update: () => void = noop) {
    this.id = id || IDUtils.prefixed(name)
    this.name = name
    this.ref = ref
    this.update = update
  }

  update(): void {}

  get element(): T {
    return this.ref.current
  }
}
