import { Theme } from '../definitions/enums'
import { AppearanceData } from '../definitions/interfaces'
import { Dummy } from './dummy'

class _Appearance {
  data: AppearanceData

  constructor() {
    this.data = Dummy.appearanceData
    this.registerThemeEventListener()
  }

  async initialize(): Promise<boolean> {
    this.setTheme(Theme.SYSTEM)
    // return this.load()
    return true
  }

  toggleTheme = async (): Promise<boolean> => {
    switch (this.data.theme) {
      case Theme.DARK:
        return this.setTheme(Theme.LIGHT)
      case Theme.LIGHT:
        return this.setTheme(Theme.DARK)
      case Theme.SYSTEM:
        return this.setTheme(Theme.SYSTEM)
    }
  }

  async setTheme(theme: Theme): Promise<boolean> {
    switch (theme) {
      case Theme.DARK:
        this.htmlElement.className = Theme.DARK.toLowerCase()
        break
      case Theme.LIGHT:
        this.htmlElement.className = Theme.LIGHT.toLowerCase()
        break
      case Theme.SYSTEM:
        return this.setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT)
    }

    // return this.save()
    return true
  }

  private registerThemeEventListener(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (v: MediaQueryListEvent) => this.setTheme(v.matches ? Theme.DARK : Theme.LIGHT))
  }

  get isThemeDark(): boolean {
    return this.data.theme === Theme.DARK
  }

  get isThemeLight(): boolean {
    return this.data.theme === Theme.LIGHT
  }

  get isThemeSystem(): boolean {
    return this.data.theme === Theme.SYSTEM
  }

  private get htmlElement(): HTMLHtmlElement {
    return document.querySelector('html') || document.createElement('html')
  }
}

export const Appearance = new _Appearance()
