import { ComponentName, DividerType } from '../definitions/enums'
import { ComponentLayerProps, DividerProps } from '../definitions/props'
import { ComponentLayerStore } from '../modules/component.layer.store'

/**
 * An abstraction for Divider stores.
 *
 * @category Store
 */
export class DividerStore extends ComponentLayerStore<HTMLDivElement> {
  /**
   * A {@link DividerType} which determines the orientation.
   */
  type: DividerType

  constructor(props: DividerProps & ComponentLayerProps<HTMLDivElement>) {
    super(ComponentName.DIVIDER, props)

    this.type = props.type || DividerType.HORIZONTAL
  }

  get isTypeHorizontal(): boolean {
    return this.type === DividerType.HORIZONTAL
  }

  get isTypeVertical(): boolean {
    return this.type === DividerType.VERTICAL
  }
}

/** @category Constant */
export const DIVIDER_STORE_KEYS: (keyof DividerProps & keyof DividerStore)[] = ['id', 'layer', 'type']
