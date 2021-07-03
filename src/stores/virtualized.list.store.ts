import { ID, Logger, noop, NumberUtils, ObjectUtils } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName, Orientation } from '../definitions/enums'
import { VirtualizedListProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

export class VirtualizedListStore<T> extends ComponentStore<HTMLDivElement> {
  dummyRef: MutableRefObject<HTMLDivElement>
  gutter: number
  items: T[]
  itemElementHeight: number
  itemElementWidth: number
  orientation: Orientation
  parentElementHeight: number
  parentElementWidth: number

  constructor(
    dummyRef: MutableRefObject<HTMLDivElement> = Dummy.ref,
    gutter: number = 0,
    id: ID = '',
    items: T[] = [],
    orientation: Orientation = Orientation.VERTICAL,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    update: () => void = noop
  ) {
    super(ComponentName.VIRTUALIZED_LIST, id, ref, update)

    this.dummyRef = dummyRef
    this.parentElementHeight = 0
    this.parentElementWidth = 0
    this.gutter = gutter
    this.items = items
    this.itemElementHeight = 0
    this.itemElementWidth = 0
    this.orientation = orientation
  }

  itemKey = (index: number): any => {
    return typeof this.items[index] === 'object' ? ObjectUtils.get(this.items[index] as any, 'id', index) : index
  }

  readItemElementHeightOrWidth(): void {
    switch (this.orientation) {
      case Orientation.HORIZONTAL:
        this.itemElementWidth = NumberUtils.parseFloat(getComputedStyle(this.dummyRef.current).width) + this.gutter
        Logger.debug(this.id, 'readItemElementHeightOrWidth', `The item element width has been set to ${this.itemElementWidth}.`)

        break
      case Orientation.VERTICAL:
        this.itemElementHeight = NumberUtils.parseFloat(getComputedStyle(this.dummyRef.current).height) + this.gutter
        Logger.debug(this.id, 'readItemElementHeightOrWidth', `The item element height has been set to ${this.itemElementHeight}.`)

        break
    }

    this.update()
  }

  readParentElementHeightOrWidth(): void {
    let element: Element | null, height: number, width: number

    element = this.element
    if (element.parentElement === null) return Logger.error(this.id, 'readElementHeightOrWidth', `The element has no parent.`)

    while (true) {
      switch (this.orientation) {
        case Orientation.HORIZONTAL:
          height = NumberUtils.parseFloat(getComputedStyle(element.parentElement || document.createElement('div')).height)
          if (height > 0) {
            this.parentElementHeight = height
            Logger.debug(this.id, 'readElementHeightOrWidth', `The parent element height has been set to ${height}.`)

            return this.update()
          }

          break
        case Orientation.VERTICAL:
          width = NumberUtils.parseFloat(getComputedStyle(element.parentElement || document.createElement('div')).width)
          if (width > 0) {
            this.parentElementWidth = width
            Logger.debug(this.id, 'readElementHeightOrWidth', `The parent element width has been set to ${width}.`)

            return this.update()
          }

          break
      }

      element = element.parentElement
      if (element === null) return Logger.debug(this.id, 'readElementHeightOrWidth', `The parent element has no parent.`)
    }
  }

  get elementHeight(): number | string {
    return this.isOrientationVertical ? this.parentElementHeight : '100%'
  }

  get elementWidth(): number | string {
    return this.isOrientationHorizontal ? this.parentElementWidth : '100%'
  }

  get hasItems(): boolean {
    return this.items.length > 0
  }

  get isItemsEmpty(): boolean {
    return this.items.length <= 0
  }

  get isOrientationHorizontal(): boolean {
    return this.orientation === Orientation.HORIZONTAL
  }

  get isOrientationVertical(): boolean {
    return this.orientation === Orientation.VERTICAL
  }
}

export const VIRTUALIZED_LIST_STORE_KEYS: (keyof VirtualizedListProps<any> & keyof VirtualizedListStore<any>)[] = ['gutter', 'id', 'items', 'orientation']
