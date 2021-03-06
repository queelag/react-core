import { ID, IDUtils, noop, NumberUtils } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentLifeCycle, Layer, Orientation, Shape, Size } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { Configuration } from './configuration'
import { Dummy } from './dummy'

/**
 * An abstraction for component stores.
 *
 * @category Module
 * @template T The DOM element.
 */
export class ComponentStore<T extends Element = HTMLDivElement> {
  /**
   * A string which identifies a component.
   */
  id: ID
  /**
   * A {@link Layer} which determines the position on the Z axis.
   */
  layer: Layer
  /**
   * A {@link ComponentLifeCycle} which determines the life cycle of a component.
   */
  life: ComponentLifeCycle
  /**
   * A boolean which determines if the component is mounted or not.
   */
  mounted: boolean
  /**
   * A string which helps identify a component, used as a prefix for the id.
   */
  name: string
  /**
   * An {@link Orientation} which determines the aspect ratio of a component.
   */
  orientation: Orientation
  /**
   * A ref with T interface.
   */
  ref: MutableRefObject<T>
  /**
   * A {@link Shape} which determines the frame of a component.
   */
  shape: Shape
  /**
   * A {@link Size} which determines the dimensions of a component.
   */
  size: Size | number | string

  constructor(name: string, props: ComponentStoreProps<T>) {
    this.dispatch = props.dispatch || noop
    this.id = props.id || Configuration.isComponentStoreGeneratingIDOnConstruction ? IDUtils.prefixed(name) : ''
    this.layer = props.layer || Layer.ZERO
    this.life = ComponentLifeCycle.CONSTRUCTED
    this.mounted = false
    this.name = name
    this.orientation = props.orientation || Orientation.HORIZONTAL
    this.ref = (props.ref as any) || Dummy.ref
    this.shape = props.shape || Shape.NONE
    this.size = props.size || Size.MEDIUM
  }

  /**
   * Marks the component as mounted.
   */
  mount(): void {
    this.life = ComponentLifeCycle.MOUNTED
  }

  /**
   * Marks the component as unmounted.
   */
  unmount(): void {
    this.life = ComponentLifeCycle.UNMOUNTED
  }

  /**
   * Forces a re-render if the component is mounted.
   */
  dispatch(): void {}

  /**
   * Returns a DOM element from the ref.
   */
  get element(): T {
    return this.ref.current || document.createElement('div')
  }

  /**
   * Returns the computed height of this image element.
   */
  get elementComputedHeight(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.element).height)
  }

  /**
   * Returns the computed width of this image element.
   */
  get elementComputedWidth(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.element).width)
  }

  get isLayerZero(): boolean {
    return this.layer === Layer.ZERO
  }

  get isLayerOne(): boolean {
    return this.layer === Layer.ONE
  }

  get isLayerTwo(): boolean {
    return this.layer === Layer.TWO
  }

  get isLayerThree(): boolean {
    return this.layer === Layer.THREE
  }

  get isMounted(): boolean {
    return this.mounted === true
  }

  get isNotMounted(): boolean {
    return this.mounted === false
  }

  get isOrientationHorizontal(): boolean {
    return this.orientation === Orientation.HORIZONTAL
  }

  get isOrientationVertical(): boolean {
    return this.orientation === Orientation.VERTICAL
  }

  get isShapeCircle(): boolean {
    return this.shape === Shape.CIRCLE
  }

  get isShapeNone(): boolean {
    return this.shape === Shape.NONE
  }

  get isShapeRectangle(): boolean {
    return this.shape === Shape.RECTANGLE
  }

  get isShapeSquare(): boolean {
    return this.shape === Shape.SQUARE
  }

  get isShapeSquircle(): boolean {
    return this.shape === Shape.SQUIRCLE
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
