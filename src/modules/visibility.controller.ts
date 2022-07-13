import { ModuleLogger } from '../loggers/module.logger'

/**
 * A generic controller for handling visibility states.
 *
 * Usage:
 *
 * ```typescript
 * import React, { useEffect } from 'react'
 * import { ModalProps, VisibilityController } from '@queelag/react-core'
 * import { observe } from '@queelag/state-manager'
 * import { observer } from '@queelag/state-manager-react'
 *
 * const ModalController = new VisibilityController()
 * observe(ModalController, ['data'])
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
 *       <div onClick={onClickBackdrop} />
 *       <div className="content" style={{ position: 'absolute' }} />
 *     </div>
 *   )
 * }, [ModalController])
 * ```
 *
 * @category Module
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
      return ModuleLogger.warn('VisibilityController', 'hide', `The key ${name} is already hidden.`)
    }

    this.data.set(name, VisibilityController.HIDING)
    ModuleLogger.debug('VisibilityController', 'hide', `The key ${name} is hiding.`, this.data.get(name))

    setTimeout(() => {
      this.data.set(name, VisibilityController.HIDDEN)
      ModuleLogger.debug('VisibilityController', 'hide', `The key ${name} is hidden.`, this.data.get(name))
    }, delay)
  }

  /**
   * Sets name to VISIBLE, after delay time sets name to SHOWING.
   */
  show(name: string, delay: number = 0): void {
    if (this.isVisible(name)) {
      return ModuleLogger.warn('VisibilityController', 'show', `The key ${name} is already visible.`, this.data.get(name))
    }

    this.data.set(name, VisibilityController.SHOWING)
    ModuleLogger.debug('VisibilityController', 'hide', `The key ${name} is showing.`, this.data.get(name))

    setTimeout(() => {
      this.data.set(name, VisibilityController.VISIBLE)
      ModuleLogger.debug('VisibilityController', 'hide', `The key ${name} is visible.`, this.data.get(name))
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

  get hasHidden(): boolean {
    return [...this.data.values()].includes(VisibilityController.HIDDEN)
  }

  get hasHiding(): boolean {
    return [...this.data.values()].includes(VisibilityController.HIDING)
  }

  get hasShowing(): boolean {
    return [...this.data.values()].includes(VisibilityController.SHOWING)
  }

  get hasVisible(): boolean {
    return [...this.data.values()].includes(VisibilityController.VISIBLE)
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
