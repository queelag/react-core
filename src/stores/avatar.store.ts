import { Color, ComponentName } from '../definitions/enums'
import { ComponentLayerShapeStoreProps } from '../definitions/interfaces'
import { AvatarProps } from '../definitions/props'
import { ComponentLayerShapeStore } from '../modules/component.layer.shape.store'
import { ColorPicker } from '../pickers/color.picker'

/**
 * An abstraction for Avatar stores, handles colors and sizes.
 *
 * @category Store
 */
export class AvatarStore extends ComponentLayerShapeStore<HTMLDivElement> {
  /** @internal */
  private _background: string = ''
  /** @internal */
  private _color: string = ''
  /**
   * A number which determines both height and width.
   */
  size: number

  constructor(props: AvatarProps & ComponentLayerShapeStoreProps<HTMLDivElement>) {
    super(ComponentName.AVATAR, props)

    this.background = props.background || Color.GRAY
    this.color = props.color || Color.MONO
    this.size = props.size
  }

  /**
   * Picks a layered background color from background.
   */
  get background(): string {
    return ColorPicker.backgroundByString(this._background, this.layer)
  }

  /**
   * Picks a layered text color from color.
   */
  get color(): string {
    return ColorPicker.textByString(this._color, this.layer)
  }

  /** @internal */
  set background(background: string) {
    this._background = background
  }

  /** @internal */
  set color(color: string) {
    this._color = color
  }
}

/** @category Constant */
export const AVATAR_STORE_KEYS: (keyof AvatarProps & keyof AvatarStore)[] = ['background', 'color', 'layer', 'shape', 'size']
