import { ID } from '@queelag/core'
import { Color, ComponentName, Layer, Shape } from '../definitions/enums'
import { ComponentLayerShapeStore } from '../modules/component.layer.shape.store'
import ColorPicker from '../pickers/color.picker'

export class AvatarStore extends ComponentLayerShapeStore<HTMLDivElement> {
  _background: string
  _color: string
  size: number

  constructor(
    background: string = Color.GRAY,
    color: string = Color.MONO,
    id: ID = '',
    layer: Layer = Layer.ZERO,
    shape: Shape = Shape.CIRCLE,
    size: number = 48,
    update?: () => void
  ) {
    super(ComponentName.AVATAR, id, layer, undefined, shape, update)

    this._background = background
    this._color = color
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
