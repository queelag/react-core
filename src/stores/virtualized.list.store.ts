import { NumberUtils, ObjectUtils } from '@queelag/core'
import { MutableRefObject, ReactNode } from 'react'
import { ComponentName, Orientation } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { VirtualizedListStoreProps } from '../definitions/props'
import { StoreLogger } from '../loggers/store.logger'
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

  constructor(props: VirtualizedListStoreProps<T> & ComponentStoreProps<HTMLUListElement>) {
    super(ComponentName.VIRTUALIZED_LIST, props)

    this.dummyRef = props.dummyRef
    this.parentElementHeight = 0
    this.parentElementWidth = 0
    this.gutter = props.gutter || 0
    this.items = props.items || []
    this.itemElementHeight = 0
    this.itemElementWidth = 0
    this.orientation = props.orientation || Orientation.VERTICAL
    this.renderItem = props.renderItem || (() => null)
  }

  renderItem(item: T, index: number): ReactNode {
    return null
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
        StoreLogger.verbose(this.id, 'readItemElementHeightOrWidth', this.orientation, `The item element width has been set to ${this.itemElementWidth}.`)

        break
      case Orientation.VERTICAL:
        this.itemElementHeight = NumberUtils.parseFloat(getComputedStyle(this.dummyRef.current).height) + this.gutter
        StoreLogger.verbose(this.id, 'readItemElementHeightOrWidth', this.orientation, `The item element height has been set to ${this.itemElementHeight}.`)

        break
    }

    this.dispatch()
  }

  /**
   * Computes the parent element width if the orientation is HORIZONTAL otherwise if the orientation is VERTICAL computes its height.
   */
  readParentElementHeightOrWidth(): void {
    let element: Element | null, height: number, width: number

    element = this.element
    if (element.parentElement === null) return StoreLogger.error(this.id, 'readElementHeightOrWidth', `The element has no parent.`)

    while (true) {
      element = element.parentElement
      if (element === null) return StoreLogger.verbose(this.id, 'readElementHeightOrWidth', `The parent element has no parent.`)

      switch (this.orientation) {
        case Orientation.HORIZONTAL:
          width =
            NumberUtils.parseFloat(getComputedStyle(element).width) -
            NumberUtils.parseFloat(getComputedStyle(element).paddingLeft) -
            NumberUtils.parseFloat(getComputedStyle(element).paddingRight)

          if (width > 0) {
            this.parentElementWidth = width
            StoreLogger.verbose(this.id, 'readElementHeightOrWidth', this.orientation, `The parent element width has been set to ${width}.`)

            return this.dispatch()
          }

          break
        case Orientation.VERTICAL:
          height =
            NumberUtils.parseFloat(getComputedStyle(element).height) -
            NumberUtils.parseFloat(getComputedStyle(element).paddingBottom) -
            NumberUtils.parseFloat(getComputedStyle(element).paddingTop)

          if (height > 0) {
            this.parentElementHeight = height
            StoreLogger.verbose(this.id, 'readElementHeightOrWidth', this.orientation, `The parent element height has been set to ${height}.`)

            return this.dispatch()
          }

          break
      }
    }
  }

  /**
   * Returns the parent element height if the orientation is VERTICAL otherwise returns 100%.
   */
  get elementHeight(): number | string {
    switch (this.orientation) {
      case Orientation.HORIZONTAL:
        return '100%'
      case Orientation.VERTICAL:
        return typeof this.size === 'number' ? NumberUtils.limit(this.items.length, 0, this.size) * this.itemElementHeight : this.parentElementHeight
    }
  }

  /**
   * Returns the parent element width if the orientation is HORIZONTAL otherwise returns 100%.
   */
  get elementWidth(): number | string {
    switch (this.orientation) {
      case Orientation.HORIZONTAL:
        return typeof this.size === 'number' ? NumberUtils.limit(this.items.length, 0, this.size) * this.itemElementWidth : this.parentElementWidth
      case Orientation.VERTICAL:
        return '100%'
    }
  }

  get hasItems(): boolean {
    return this.items.length > 0
  }

  get isItemsEmpty(): boolean {
    return this.items.length <= 0
  }
}
