import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Size } from '../definitions/enums'
import { ComponentStore } from './component.store'
import { Dummy } from './dummy'

/**
 * @category Module
 */
export class ComponentSizeStore<T extends Element> extends ComponentStore<T> {
  size: Size

  constructor(name: string, id: ID = '', ref: MutableRefObject<T> = Dummy.ref, size: Size = Size.MEDIUM, update: () => void = noop) {
    super(name, id, ref, update)

    this.size = size
  }

  get isSizeLarge(): boolean {
    return this.size === Size.LARGE
  }

  get isSizeMedium(): boolean {
    return this.size == Size.MEDIUM
  }

  get isSizeSmall(): boolean {
    return this.size === Size.SMALL
  }
}
