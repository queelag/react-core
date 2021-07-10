import { ID, noop, tcp } from '@queelag/core'
import { MouseEvent, MutableRefObject } from 'react'
import { ButtonType, ComponentName, Layer, Shape, Size } from '../definitions/enums'
import { ButtonProps } from '../definitions/props'
import { ComponentLayerShapeSizeStore } from '../modules/component.layer.shape.size.store'
import { Dummy } from '../modules/dummy'

export class ButtonStore extends ComponentLayerShapeSizeStore<HTMLButtonElement> {
  disabled: boolean
  spinning: boolean
  type: ButtonType

  constructor(
    disabled: boolean = false,
    id: ID = '',
    layer: Layer = Layer.ONE,
    onClick: (event: MouseEvent<HTMLButtonElement>) => any = noop,
    ref: MutableRefObject<HTMLButtonElement> = Dummy.ref,
    shape: Shape = Shape.RECTANGLE,
    size: Size = Size.MEDIUM,
    spinning: boolean = false,
    type: ButtonType = ButtonType.OUTLINE,
    update: () => void
  ) {
    super(ComponentName.BUTTON, id, layer, ref, shape, size, update)

    this.disabled = disabled
    this.onClick = onClick
    this.spinning = spinning
    this.type = type
  }

  private _onClick = (event: MouseEvent<HTMLButtonElement>): any => {}

  get onClick(): (event: MouseEvent<HTMLButtonElement>) => any {
    return this._onClick
  }

  get isDisabled(): boolean {
    return this.disabled === true
  }

  get isEnabled(): boolean {
    return this.disabled === false
  }

  get isSpinning(): boolean {
    return this.spinning === true
  }

  get isNotSpinning(): boolean {
    return this.spinning === false
  }

  get isTypeNone(): boolean {
    return this.type === ButtonType.NONE
  }

  get isTypeOutline(): boolean {
    return this.type === ButtonType.OUTLINE
  }

  get isTypePrimary(): boolean {
    return this.type === ButtonType.PRIMARY
  }

  get isTypeSecondary(): boolean {
    return this.type === ButtonType.SECONDARY
  }

  get isTypeText(): boolean {
    return this.type === ButtonType.TEXT
  }

  set onClick(onClick: (event: MouseEvent<HTMLButtonElement>) => any) {
    this._onClick = async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      if (this.isDisabled) {
        return
      }

      this.disabled = true
      this.spinning = true

      this.update()

      await tcp(() => onClick(event))

      this.disabled = false
      this.spinning = false

      this.update()
    }
  }
}

export const BUTTON_STORE_KEYS: (keyof ButtonProps & keyof ButtonStore)[] = ['disabled', 'id', 'layer', 'onClick', 'shape', 'size', 'spinning', 'type']
