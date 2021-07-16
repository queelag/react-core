import { ID, noop, NumberUtils } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName } from '../definitions/enums'
import { OnboardingProps } from '../definitions/props'
import { OnboardingItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'

/**
 * @category Store
 */
export class OnboardingStore extends ComponentStore<HTMLDivElement> {
  active: number
  items: OnboardingItem[]
  start: number

  constructor(id: ID = '', items: OnboardingItem[] = [], onEnd: () => any = noop, ref: MutableRefObject<HTMLDivElement>, update: () => void = noop) {
    super(ComponentName.ONBOARDING, id, ref, update)

    this.active = 0
    this.items = items
    this.onEnd = onEnd
    this.start = 0
  }

  onClickPrevious = (): void => {
    this.active = NumberUtils.limit(this.active - 1, 0)
    this.update()
  }

  onClickNext = (): void => {
    this.active += 1
    if (this.isOver) return this.onEnd()

    this.update()
  }

  onClickSkip = (): void => {
    this.onEnd()
  }

  onEnd(): void {}

  get isOver(): boolean {
    return this.active === this.items.length
  }
}

/** @category Constant */
export const ONBOARDING_STORE_KEYS: (keyof OnboardingProps & keyof OnboardingStore)[] = ['id', 'items', 'onEnd']
