import { Logger } from '@queelag/core'

/**
 * A generic controller for handling visibility states.
 *
 * Usage:
 *
 * ```typescript
 * import React, { useEffect } from 'react'
 * import { Backdrop, ModalProps, VisibilityController } from '@queelag/react-core'
 * import { makeObservable, observer } from 'mobx'
 *
 * class _ModalController extends VisibilityController {
 *   constructor() {
 *     super()
 *     makeObservable(this, { data: observable })
 *   }
 * }
 *
 * const ModalController = new _ModalController()
 *
 * const Modal = observer((props: ModalProps) => {
 *   const onClickBackdrop = () => ModalController.hide(props.name)
 *
 *   useEffect(() => {
 *     ModalController.show(props.name)
 *   }, [])
 *
 *   if (ModalController.isHidden(props.name)) {
 *     return null
 *   }
 *
 *   return (
 *     <div className="container" style={{ position: 'relative' }}>
 *       <Backdrop onClick={onClickBackdrop} />
 *       <div className="content" style={{ position: 'absolute' }} />
 *     </div>
 *   )
 * })
 * ```
 *
 * @category Controller
 */
export class VisibilityController {
  /** @internal */
  readonly data: Map<string, number>

  constructor() {
    this.data = new Map()
  }

  /**
   * Sets name to HIDING, after delay time sets name to HIDDEN.
   */
  hide(name: string, delay: number = 0): void {
    if (this.isHidden(name)) {
      return Logger.warn('VisibilityController', 'hide', `The key ${name} is already hidden.`)
    }

    this.data.set(name, VisibilityController.HIDING)
    Logger.debug('VisibilityController', 'hide', `The key ${name} is hiding.`, this.data.get(name))

    setTimeout(() => {
      this.data.set(name, VisibilityController.HIDDEN)
      Logger.debug('VisibilityController', 'hide', `The key ${name} is hidden.`, this.data.get(name))
    }, delay)
  }

  /**
   * Sets name to VISIBLE, after delay time sets name to SHOWING.
   */
  show(name: string, delay: number = 0): void {
    if (this.isVisible(name)) {
      return Logger.warn('VisibilityController', 'show', `The key ${name} is already visible.`, this.data.get(name))
    }

    this.data.set(name, VisibilityController.SHOWING)
    Logger.debug('VisibilityController', 'hide', `The key ${name} is showing.`, this.data.get(name))

    setTimeout(() => {
      this.data.set(name, VisibilityController.VISIBLE)
      Logger.debug('VisibilityController', 'hide', `The key ${name} is visible.`, this.data.get(name))
    }, delay)
  }

  /**
   * Shows name if it's hidden or hides it if it's shown.
   */
  toggle(name: string, delay: number = 0): void {
    this.isHidden(name) ? this.show(name) : this.hide(name, delay)
  }

  /** @internal */
  private get(name: string): number {
    return this.data.get(name) || VisibilityController.HIDDEN
  }

  /**
   * Checks if name is HIDDEN.
   */
  isHidden(name: string): boolean {
    return this.get(name) === VisibilityController.HIDDEN
  }

  /**
   * Checks if name is HIDING.
   */
  isHiding(name: string): boolean {
    return this.get(name) === VisibilityController.HIDING
  }

  /**
   * Checks if name is SHOWING.
   */
  isShowing(name: string): boolean {
    return this.get(name) === VisibilityController.SHOWING
  }

  /**
   * Checks if name is VISIBLE.
   */
  isVisible(name: string): boolean {
    return this.get(name) === VisibilityController.VISIBLE
  }

  static get HIDDEN(): number {
    return 0
  }

  static get HIDING(): number {
    return 1
  }

  static get SHOWING(): number {
    return 2
  }

  static get VISIBLE(): number {
    return 3
  }
}
