import { Layer, Shape } from '../definitions/enums'
import { ComponentLayerShapeStoreProps } from '../definitions/interfaces'
import { ComponentStore } from './component.store'

/**
 * @category Module
 */
export class ComponentLayerShapeStore<T extends Element> extends ComponentStore<T> {
  layer: Layer
  shape: Shape

  constructor(name: string, props: ComponentLayerShapeStoreProps<T>) {
    super(name, props)

    this.layer = props.layer || Layer.ZERO
    this.shape = props.shape || Shape.NONE
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
}
