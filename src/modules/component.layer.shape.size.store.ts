import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Layer, Shape, Size } from '../definitions/enums'
import { ComponentStore } from './component.store'
import { Dummy } from './dummy'

export class ComponentLayerShapeSizeStore<T extends Element> extends ComponentStore<T> {
  layer: Layer
  shape: Shape
  size: Size

  constructor(
    name: string,
    id: ID = '',
    layer: Layer = Layer.ZERO,
    ref: MutableRefObject<T> = Dummy.ref,
    shape: Shape = Shape.NONE,
    size: Size = Size.MEDIUM,
    update: () => void = noop
  ) {
    super(name, id, ref, update)

    this.layer = layer
    this.shape = shape
    this.size = size
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
