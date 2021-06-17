import { MutableRefObject } from 'react'
import { OptionalID } from '../../../core/dist'
import { Layer } from '../definitions/enums'
import { ComponentStore } from './component.store'
import { Dummy } from './dummy'

class ComponentLayerStore<T extends HTMLElement> extends ComponentStore<T> {
  layer: Layer

  constructor(name: string, id: OptionalID, layer: Layer = Layer.ZERO, ref: MutableRefObject<T> = Dummy.ref, update?: () => void) {
    super(name, id, ref, update)

    this.layer = layer
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

export default ComponentLayerStore
