import { ID, tcp } from '@queelag/core'
import { MouseEvent } from 'react'
import { ButtonType, ComponentName, Layer, Shape } from '../definitions/enums'
import { ComponentLayerShapeStore } from '../modules/component.layer.shape.store'

export class ButtonStore extends ComponentLayerShapeStore<HTMLButtonElement> {
  disabled: boolean
  spinning: boolean
  type: ButtonType

  constructor(
    disabled: boolean = false,
    id: ID = '',
    layer: Layer = Layer.ONE,
    onClick: () => any,
    shape: Shape = Shape.RECTANGLE,
    type: ButtonType = ButtonType.SECONDARY,
    update: () => void
  ) {
    super(ComponentName.BUTTON, id, layer, undefined, shape, update)

    this.disabled = disabled
    this.onClick = onClick
    this.spinning = false
    this.type = type
  }

  private _onClick = (event: MouseEvent<HTMLButtonElement>): any => {}

  get onClick(): (event: MouseEvent<HTMLButtonElement>) => any {
    return async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      if (this.isDisabled) {
        return
      }

      this.disabled = true
      this.spinning = true

      this.update()

      await tcp(() => this._onClick(event))

      this.disabled = false
      this.spinning = false

      this.update()
    }
  }

  get isDisabled(): boolean {
    return this.disabled === true
  }

  get isSpinning(): boolean {
    return this.spinning === true
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
    this._onClick = onClick
  }
}
