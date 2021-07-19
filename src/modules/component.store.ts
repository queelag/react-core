import { ID, IDUtils, noop } from '@queelag/core'
import { LegacyRef, MutableRefObject } from 'react'
import { ComponentStoreProps } from '../definitions/interfaces'
import { Dummy } from './dummy'

/**
 * An abstraction for component stores.
 *
 * @category Module
 * @template T The DOM element.
 */
export class ComponentStore<T extends Element> {
  /**
   * A string which identifies a component.
   */
  id: ID
  /**
   * A string which helps identify a component, used as a prefix for the id.
   */
  name: string
  /**
   * A ref with T interface.
   */
  ref: LegacyRef<T> | MutableRefObject<T>

  constructor(name: string, props: ComponentStoreProps<T>) {
    this.id = props.id || IDUtils.prefixed(name)
    this.name = name
    this.ref = props.ref || Dummy.ref
    this.update = props.update || noop
  }

  /**
   * Forces a re-render.
   */
  update(): void {}

  /**
   * Returns a DOM element from the ref.
   */
  get element(): T {
    return (this.ref as MutableRefObject<T>).current || this.ref || document.createElement('div')
  }
}
