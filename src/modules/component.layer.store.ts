import { Layer } from '../definitions/enums'
import { ComponentLayerStoreProps } from '../definitions/interfaces'
import { ComponentStore } from './component.store'

/**
 * @category Module
 */
export class ComponentLayerStore<T extends Element> extends ComponentStore<T> {
  layer: Layer

  constructor(name: string, props: ComponentLayerStoreProps<T>) {
    super(name, props)

    this.layer = props.layer || Layer.ZERO
  }

  get isLayerZero(): boolean {
    return this.layer === Layer.ZERO
  }

  get isLayerOne(): boolean {
    return this.layer === Layer.ONE
  }

  get isLayerTwo(): boolean {
    return this.layer === Layer.TWO
  }

  get isLayerThree(): boolean {
    return this.layer === Layer.THREE
  }
}
