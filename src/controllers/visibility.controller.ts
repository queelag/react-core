import { Logger } from '@queelag/core'

export class VisibilityController {
  data: Map<string, number>

  constructor() {
    this.data = new Map()
  }

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

  show(name: string, delay: number = 0): void {
    if (this.isVisible(name)) {
      return Logger.warn('VisibilityController', 'show', `The key ${name} is already visible.`, this.data.get(name))
    }

    this.data.set(name, VisibilityController.VISIBLE)
    Logger.debug('VisibilityController', 'hide', `The key ${name} is visible.`, this.data.get(name))

    setTimeout(() => {
      this.data.set(name, VisibilityController.SHOWING)
      Logger.debug('VisibilityController', 'hide', `The key ${name} is showing.`, this.data.get(name))
    }, delay)
  }

  toggle(name: string, delay: number = 0): void {
    this.isHidden(name) ? this.show(name) : this.hide(name, delay)
  }

  private get(name: string): number {
    return this.data.get(name) || VisibilityController.HIDDEN
  }

  isHiding(name: string): boolean {
    return this.get(name) === VisibilityController.HIDING
  }

  isHidden(name: string): boolean {
    return this.get(name) === VisibilityController.HIDDEN
  }

  isVisible(name: string): boolean {
    return this.get(name) !== VisibilityController.HIDDEN
  }

  isShowing(name: string): boolean {
    return this.get(name) === VisibilityController.SHOWING
  }

  static get HIDDEN(): number {
    return 0
  }

  static get HIDING(): number {
    return 1
  }

  static get VISIBLE(): number {
    return 2
  }

  static get SHOWING(): number {
    return 3
  }
}
