import { Shape } from '../definitions/enums'
import { ComponentShapeStoreProps } from '../definitions/interfaces'
import { ComponentStore } from './component.store'

/**
 * @category Module
 */
export class ComponentShapeStore<T extends Element> extends ComponentStore<T> {
  shape: Shape

  constructor(name: string, props: ComponentShapeStoreProps<T>) {
    super(name, props)

    this.shape = props.shape || Shape.NONE
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
