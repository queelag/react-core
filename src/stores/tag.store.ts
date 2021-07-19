import { MouseEvent } from 'react'
import { ComponentName } from '../definitions/enums'
import { ComponentLayerStoreProps } from '../definitions/interfaces'
import { TagProps } from '../definitions/props'
import { ComponentLayerStore } from '../modules/component.layer.store'

/**
 * An abstraction for Tag stores, handles destruction.
 *
 * @category Store
 */
export class TagStore extends ComponentLayerStore<HTMLDivElement> {
  /**
   * A boolean which determines if this tag has been destroyed or not.
   */
  destroyed: boolean

  constructor(props: TagProps & ComponentLayerStoreProps<HTMLDivElement>) {
    super(ComponentName.TAG, props)

    this.destroyed = false
  }

  /**
   * Destroys this tag.
   */
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

/** @category Constant */
export const TAG_STORE_KEYS: (keyof TagProps & keyof TagStore)[] = ['id', 'layer']
