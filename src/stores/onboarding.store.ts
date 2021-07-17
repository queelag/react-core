import { NumberUtils } from '@queelag/core'
import { ComponentName } from '../definitions/enums'
import { ComponentProps, OnboardingProps } from '../definitions/props'
import { OnboardingItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for Onboarding stores, handles cursors and items.
 *
 * @category Store
 */
export class OnboardingStore extends ComponentStore<HTMLDivElement> {
  /**
   * A number which determines the active item index.
   */
  active: number
  /**
   * An array of {@link OnboardingItem}.
   */
  items: OnboardingItem[]

  constructor(props: OnboardingProps & ComponentProps<HTMLDivElement>) {
    super(ComponentName.ONBOARDING, props)

    this.active = 0
    this.items = props.items
    this.onEnd = props.onEnd
  }

  /**
   * Goes the the previous item.
   */
  onClickPrevious = (): void => {
    this.active = NumberUtils.limit(this.active - 1, 0)
    this.update()
  }

  /**
   * Goes to the next item.
   */
  onClickNext = (): void => {
    this.active += 1
    if (this.isOver) return this.onEnd()

    this.update()
  }

  /**
   * Triggers onEnd.
   */
  onClickSkip = (): void => {
    this.onEnd()
  }

  /**
   * Triggered by onClickNext if there are no more items or by onClickSkip.
   */
  onEnd(): void {}

  /**
   * Checks if there are no more items.
   */
  get isOver(): boolean {
    return this.active === this.items.length
  }
}

/** @category Constant */
export const ONBOARDING_STORE_KEYS: (keyof OnboardingProps & keyof OnboardingStore)[] = ['id', 'items', 'onEnd']
