import { ID, noop, NumberUtils, ObjectUtils } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName, Layer } from '../definitions/enums'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { Dummy } from '../modules/dummy'

export class VirtualizedListStore<T> extends ComponentLayerStore<HTMLDivElement> {
  dummyRef: MutableRefObject<HTMLDivElement>
  elementHeight: number
  gutter: number
  items: T[]
  itemElementHeight: number

  constructor(
    dummyRef: MutableRefObject<HTMLDivElement> = Dummy.ref,
    gutter: number = 0,
    id: ID = '',
    items: T[] = [],
    layer: Layer = Layer.ZERO,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    update: () => void = noop
  ) {
    super(ComponentName.VIRTUALIZED_LIST, id, layer, ref, update)

    this.dummyRef = dummyRef
    this.elementHeight = 0
    this.gutter = gutter
    this.items = items
    this.itemElementHeight = 0
  }

  itemKey = (index: number): any => {
    return typeof this.items[index] === 'object' ? ObjectUtils.get(this.items[index] as any, 'id', index) : index
  }

  findElementHeightByParents(): number {
    let element: Element | null, height: number

    element = this.element
    if (element.parentElement === null) return 0

    while (true) {
      height = NumberUtils.parseFloat(getComputedStyle(element.parentElement || document.createElement('div')).height)
      if (height > 0) break

      element = element.parentElement
      if (element === null) return 0
    }

    return height
  }

  findItemElementHeightByDummy(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.dummyRef.current).height) + this.gutter
  }

  get elementWidth(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.element).width)
  }

  get renderableItemElements(): number {
    return Math.round(this.elementHeight / this.itemElementHeight)
  }

  get hasItems(): boolean {
    return this.items.length > 0
  }

  get isItemsEmpty(): boolean {
    return this.items.length <= 0
  }
}
