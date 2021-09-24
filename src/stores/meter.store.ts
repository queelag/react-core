import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { MeterProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for Meter stores.
 *
 * @category Store
 */
export class MeterStore extends ComponentStore<HTMLDivElement> {
  constructor(props: MeterProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.METER, props)
  }
}
