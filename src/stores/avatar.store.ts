import { ID } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Color, ComponentName, Layer, Shape } from '../definitions/enums'
import { AvatarProps } from '../definitions/props'
import { ComponentLayerShapeStore } from '../modules/component.layer.shape.store'
import { Dummy } from '../modules/dummy'
import { ColorPicker } from '../pickers/color.picker'

/**
 * @category Store
 */
export class AvatarStore extends ComponentLayerShapeStore<HTMLDivElement> {
  private _background: string = ''
  private _color: string = ''
  ratio: number
  size: number

  constructor(
    background: string = Color.GRAY,
    color: string = Color.MONO,
    id: ID = '',
    layer: Layer = Layer.ZERO,
    ratio: number = 2,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    shape: Shape = Shape.CIRCLE,
    size: number = 48,
    update?: () => void
  ) {
    super(ComponentName.AVATAR, id, layer, ref, shape, update)

    this.background = background
    this.color = color
    this.ratio = ratio
    this.size = size
  }

  get background(): string {
    return ColorPicker.backgroundByString(this._background, this.layer)
  }

  get color(): string {
    return ColorPicker.textByString(this._color, this.layer)
  }

  set background(background: string) {
    this._background = background
  }

  set color(color: string) {
    this._color = color
  }
}

/** @category Constant */
export const AVATAR_STORE_KEYS: (keyof AvatarProps & keyof AvatarStore)[] = ['background', 'color', 'layer', 'ratio', 'shape', 'size']
