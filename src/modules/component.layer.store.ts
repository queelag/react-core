import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Layer } from '../definitions/enums'
import { ComponentStore } from './component.store'
import { Dummy } from './dummy'

export class ComponentLayerStore<T extends Element> extends ComponentStore<T> {
  layer: Layer

  constructor(name: string, id: ID = '', layer: Layer = Layer.ZERO, ref: MutableRefObject<T> = Dummy.ref, update: () => void = noop) {
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
