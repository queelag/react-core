import { Color, ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { AvatarProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'
import { ColorPicker } from '../pickers/color.picker'

/**
 * An abstraction for Avatar stores, handles colors and sizes.
 *
 * @category Store
 */
export class AvatarStore extends ComponentStore {
  /** @internal */
  private _background: string = ''
  /** @internal */
  private _color: string = ''

  constructor(props: AvatarProps & ComponentStoreProps) {
    super(ComponentName.AVATAR, props)

    this.background = props.background || Color.GRAY
    this.color = props.color || Color.MONO
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
