import { MouseEvent } from 'react'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { TagProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'

/**
 * An abstraction for Tag stores, handles destruction.
 *
 * @category Store
 */
export class TagStore extends ComponentStore<HTMLDivElement> {
  /**
   * A boolean which determines if this tag has been destroyed or not.
   */
  destroyed: boolean

  constructor(props: TagProps & ComponentStoreProps<HTMLDivElement>) {
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
