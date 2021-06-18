import { ID, noop } from '@queelag/core'
import { MouseEvent, MutableRefObject } from 'react'
import { ComponentName, Layer } from '../definitions/enums'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { Dummy } from '../modules/dummy'

export class TagStore extends ComponentLayerStore<HTMLDivElement> {
  destroyed: boolean

  constructor(id: ID = '', layer: Layer = Layer.ZERO, ref: MutableRefObject<HTMLDivElement> = Dummy.ref, update: () => void = noop) {
    super(ComponentName.TAG, id, layer, ref, update)

    this.destroyed = false
  }

  onClickDestroy = (event: MouseEvent) => {
    event.stopPropagation()

    this.destroyed = true
    this.update()
  }

  get isDestroyed(): boolean {
    return this.destroyed === true
  }

  get isNotDestroyed(): boolean {
    return this.destroyed === false
  }
}
