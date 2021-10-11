import { Logger, noop, tcp } from '@queelag/core'
import { MouseEvent } from 'react'
import { ButtonVariant, ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ButtonProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for Button stores, handles disabled and spinning statuses.
 *
 * @category Store
 */
export class ButtonStore extends ComponentStore<HTMLButtonElement> {
  /**
   * A boolean which determines if this button is disabled or not.
   */
  disabled: boolean
  /**
   * A boolean which determines if this button is spinning or not.
   */
  spinning: boolean
  /**
   * A {@link ButtonVariant}, useful for handling custom styles.
   */
  variant: ButtonVariant

  constructor(props: ButtonProps & ComponentStoreProps<HTMLButtonElement>) {
    super(ComponentName.BUTTON, props)

    this.disabled = props.disabled || false
    this.onClick = props.onClick || noop
    this.spinning = props.spinning || false
    this.variant = props.variant || ButtonVariant.OUTLINE
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

  get isVariantNone(): boolean {
    return this.variant === ButtonVariant.NONE
  }

  get isVariantOpacity(): boolean {
    return this.variant === ButtonVariant.OPACITY
  }

  get isVariantOutline(): boolean {
    return this.variant === ButtonVariant.OUTLINE
  }

  get isVariantPrimary(): boolean {
    return this.variant === ButtonVariant.PRIMARY
  }

  get isVariantSecondary(): boolean {
    return this.variant === ButtonVariant.SECONDARY
  }

  get isVariantText(): boolean {
    return this.variant === ButtonVariant.TEXT
  }

  /** @internal */
  set onClick(onClick: (event: MouseEvent<HTMLButtonElement>) => any) {
    this._onClick = async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      if (this.isDisabled) {
        return Logger.warn(this.id, 'onClick', `Execution stopped, disabled is truthy.`)
      }

      this.disabled = true
      this.spinning = true

      Logger.debug(this.id, 'onClick', `The disabled and spinning states have been set to true.`)

      this.update()

      await tcp(() => onClick(event))

      this.disabled = false
      this.spinning = false

      Logger.debug(this.id, 'onClick', `The disabled and spinning states have been set to false.`)

      this.update()
    }
  }
}
