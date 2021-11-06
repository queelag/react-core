import { Logger, noop, NumberUtils } from '@queelag/core'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps, OnboardingItem } from '../definitions/interfaces'
import { OnboardingProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * An abstraction for Onboarding stores, handles cursors and items.
 *
 * @category Store
 */
export class OnboardingStore extends ComponentStore {
  /**
   * A number which determines the active item index.
   */
  activeItemIndex: number
  /**
   * An array of {@link OnboardingItem}.
   */
  items: OnboardingItem[]

  constructor(props: OnboardingProps & ComponentStoreProps) {
    super(ComponentName.ONBOARDING, props)

    this.activeItemIndex = props.activeItemIndex || 0
    this.items = props.items
    this.onEnd = props.onEnd || noop
  }

  /**
   * Goes the the previous item.
   */
  onClickPrevious = (): void => {
    this.activeItemIndex = NumberUtils.limit(this.activeItemIndex - 1, 0)
    Logger.debug(this.id, 'onClickPrevious', `The active item index has been set to ${this.activeItemIndex}.`)

    this.update()
  }

  /**
   * Goes to the next item.
   */
  onClickNext = (): void => {
    if (this.isOver) {
      this.onEnd()
      Logger.debug(this.id, 'onClickNext', `The onEnd function has been called.`, this.onEnd)

      return
    }

    this.activeItemIndex += 1
    Logger.debug(this.id, 'onClickNext', `The active item index has been set to ${this.activeItemIndex}.`)

    this.update()
  }

  /**
   * Triggers onEnd.
   */
  onClickSkip = (): void => {
    this.onEnd()
    Logger.debug(this.id, 'onClickSkip', `The onEnd function has been called.`, this.onEnd)
  }

  /**
   * Triggered by onClickNext if there are no more items or by onClickSkip.
   */
  onEnd(): any {}

  get activeItem(): OnboardingItem {
    return this.items[this.activeItemIndex] || Dummy.onboardingItem
  }

  /**
   * Checks if there are no more items.
   */
  get isOver(): boolean {
    return this.activeItemIndex >= this.items.length - 1
  }
}
