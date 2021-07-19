import { Logger, NumberUtils, ObjectUtils } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName, Orientation } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { VirtualizedListProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for VirtualizedList stores, handles gutter, items, orientations and sizes.
 *
 * @category Store
 */
export class VirtualizedListStore<T> extends ComponentStore<HTMLUListElement> {
  /**
   * A ref of the dummy item element.
   */
  dummyRef: MutableRefObject<HTMLDivElement>
  /**
   * A number which determines the spacing between items.
   */
  gutter: number
  /**
   * An array of T.
   */
  items: T[]
  /**
   * A number of the computed dummy item element height.
   */
  itemElementHeight: number
  /**
   * A number which determines the item element width.
   */
  itemElementWidth: number
  /**
   * An {@link Orientation} which determines how sizes are calculated.
   */
  orientation: Orientation
  /**
   * A number which determines the parent element height.
   */
  parentElementHeight: number
  /**
   * A number which determines the parent element width.
   */
  parentElementWidth: number

  constructor(props: VirtualizedListProps<T> & ComponentStoreProps<HTMLUListElement> & { dummyRef: MutableRefObject<HTMLDivElement> }) {
    super(ComponentName.VIRTUALIZED_LIST, props)

    this.dummyRef = props.dummyRef
    this.parentElementHeight = 0
    this.parentElementWidth = 0
    this.gutter = props.gutter || 0
    this.items = props.items
    this.itemElementHeight = 0
    this.itemElementWidth = 0
    this.orientation = props.orientation || Orientation.VERTICAL
  }

  /**
   * Searches for an id key inside of items[index] otherwise uses the index.
   */
  itemKey = (index: number): any => {
    return typeof this.items[index] === 'object' ? ObjectUtils.get(this.items[index] as any, 'id', index) : index
  }

  /**
   * Computes the item element width if the orientation is HORIZONTAL otherwise if the orientation is VERTICAL computes its height.
   */
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

  /**
   * Computes the parent element width if the orientation is HORIZONTAL otherwise if the orientation is VERTICAL computes its height.
   */
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

  /**
   * Returns the parent element height if the orientation is VERTICAL otherwise returns 100%.
   */
  get elementHeight(): number | string {
    return this.isOrientationVertical ? this.parentElementHeight : '100%'
  }

  /**
   * Returns the parent element width if the orientation is HORIZONTAL otherwise returns 100%.
   */
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

/** @category Constant */
export const VIRTUALIZED_LIST_STORE_KEYS: (keyof VirtualizedListProps<any> & keyof VirtualizedListStore<any>)[] = ['gutter', 'id', 'items', 'orientation']
