import { Logger, noop } from '@queelag/core'
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
   * A boolean which determines if this tag is destroyable or not.
   */
  destroyable: boolean
  /**
   * A boolean which determines if this tag has been destroyed or not.
   */
  destroyed: boolean

  constructor(props: TagProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.TAG, props)

    this.destroyable = props.destroyable || false
    this.destroyed = props.destroyed || false
    this.onDestroy = props.onDestroy || noop
  }

  onDestroy(): any {}

  /**
   * Destroys this tag.
   */
  onClickDestroy = (event: MouseEvent) => {
    event.stopPropagation()

    if (this.isNotDestroyable) {
      return Logger.warn(this.id, 'onClickDestroy', `Execution stopped, destroyable is falsy.`)
    }

    this.destroyed = true
    Logger.debug(this.id, 'onClickDestroy', `The destroyed state has been set to true.`)

    this.onDestroy()

    this.update()
  }

  get isDestroyable(): boolean {
    return this.destroyable === false
  }

  get isNotDestroyable(): boolean {
    return this.destroyable === true
  }

  get isDestroyed(): boolean {
    return this.destroyed === true
  }

  get isNotDestroyed(): boolean {
    return this.destroyed === false
  }
}
