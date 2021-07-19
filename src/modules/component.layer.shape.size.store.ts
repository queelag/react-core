import { Layer, Shape, Size } from '../definitions/enums'
import { ComponentLayerShapeSizeStoreProps } from '../definitions/interfaces'
import { ComponentStore } from './component.store'

/**
 * @category Module
 */
export class ComponentLayerShapeSizeStore<T extends Element> extends ComponentStore<T> {
  layer: Layer
  shape: Shape
  size: Size

  constructor(name: string, props: ComponentLayerShapeSizeStoreProps<T>) {
    super(name, props)

    this.layer = props.layer || Layer.ZERO
    this.shape = props.shape || Shape.NONE
    this.size = props.size || Size.MEDIUM
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
    return this.layer === Layer.TWO
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
