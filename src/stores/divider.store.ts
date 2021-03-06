import { ComponentName, Orientation } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { DividerProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for Divider stores.
 *
 * @category Store
 */
export class DividerStore extends ComponentStore {
  /**
   * An {@link Orientation} which determines the style.
   */
  orientation: Orientation

  constructor(props: DividerProps & ComponentStoreProps) {
    super(ComponentName.DIVIDER, props)

    this.orientation = props.orientation || Orientation.HORIZONTAL
  }

  get isOrientationHorizontal(): boolean {
    return this.orientation === Orientation.HORIZONTAL
  }

  get isOrientationVertical(): boolean {
    return this.orientation === Orientation.VERTICAL
  }
}
