import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Layer, Shape } from '../definitions/enums'
import { ComponentStore } from './component.store'
import { Dummy } from './dummy'

/**
 * @category Module
 */
export class ComponentLayerShapeStore<T extends Element> extends ComponentStore<T> {
  layer: Layer
  shape: Shape

  constructor(
    name: string,
    id: ID = '',
    layer: Layer = Layer.ZERO,
    ref: MutableRefObject<T> = Dummy.ref,
    shape: Shape = Shape.NONE,
    update: () => void = noop
  ) {
    super(name, id, ref, update)

    this.layer = layer
    this.shape = shape
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
