import { noop, tcp } from '@queelag/core'
import { MouseEvent } from 'react'
import { ButtonType, ComponentName } from '../definitions/enums'
import { ButtonProps, ComponentLayerShapeSizeProps } from '../definitions/props'
import { ComponentLayerShapeSizeStore } from '../modules/component.layer.shape.size.store'

/**
 * An abstraction for Button stores, handles disabled and spinning statuses.
 *
 * @category Store
 */
export class ButtonStore extends ComponentLayerShapeSizeStore<HTMLButtonElement> {
  /**
   * A boolean which determines if this button is disabled or not.
   */
  disabled: boolean
  /**
   * A boolean which determines if this button is spinning or not.
   */
  spinning: boolean
  /**
   * A {@link ButtonType}, useful for handling custom styles.
   */
  type: ButtonType

  constructor(props: ButtonProps & ComponentLayerShapeSizeProps<HTMLButtonElement>) {
    super(ComponentName.BUTTON, props)

    this.disabled = props.disabled || false
    this.onClick = props.onClick || noop
    this.spinning = props.spinning || false
    this.type = props.type || ButtonType.OUTLINE
  }

  /** @internal */
  private _onClick = (event: MouseEvent<HTMLButtonElement>): any => {}

  /**
   * An event triggered by clicking on this button.
   */
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

  /** @internal */
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

/** @category Constant */
export const BUTTON_STORE_KEYS: (keyof ButtonProps & keyof ButtonStore)[] = ['disabled', 'id', 'layer', 'onClick', 'shape', 'size', 'spinning', 'type']
