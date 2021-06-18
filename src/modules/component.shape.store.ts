import { ID } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Shape } from '../definitions/enums'
import { ComponentStore } from './component.store'

export class ComponentShapeStore<T extends Element> extends ComponentStore<T> {
  shape: Shape

  constructor(name: string, id?: ID, ref?: MutableRefObject<T>, shape: Shape = Shape.NONE, update?: () => void) {
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
