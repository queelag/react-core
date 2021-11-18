import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { BadgeProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

export class BadgeStore extends ComponentStore {
  /**
   * The value of the badge.
   */
  value: number

  constructor(props: BadgeProps & ComponentStoreProps) {
    super(ComponentName.BADGE, props)

    this.value = props.value || 0
  }
}
