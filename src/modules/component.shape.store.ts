import { MutableRefObject } from 'react'
import { OptionalID } from '../../../core/dist'
import { Shape } from '../definitions/enums'
import { ComponentStore } from './component.store'
import { Dummy } from './dummy'

class ComponentShapeStore<T extends HTMLElement> extends ComponentStore<T> {
  shape: Shape

  constructor(name: string, id: OptionalID, ref: MutableRefObject<T> = Dummy.ref, shape: Shape = Shape.NONE, update?: () => void) {
    super(name, id, ref, update)

    this.shape = shape
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

export default ComponentShapeStore
