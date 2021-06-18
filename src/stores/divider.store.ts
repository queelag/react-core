import { ID, noop } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName, DividerType, Layer } from '../definitions/enums'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { Dummy } from '../modules/dummy'

export class DividerStore extends ComponentLayerStore<HTMLDivElement> {
  type: DividerType

  constructor(
    id: ID = '',
    layer: Layer = Layer.ZERO,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    type: DividerType = DividerType.HORIZONTAL,
    update: () => void = noop
  ) {
    super(ComponentName.DIVIDER, id, layer, ref, update)

    this.type = type
  }

  get isTypeHorizontal(): boolean {
    return this.type === DividerType.HORIZONTAL
  }

  get isTypeVertical(): boolean {
    return this.type === DividerType.VERTICAL
  }
}
