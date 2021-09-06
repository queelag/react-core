import { Environment, LocalStorage, Logger } from '@queelag/core'
import { LocalStorageName, Theme } from '../definitions/enums'
import { AppearanceData } from '../definitions/interfaces'
import { Dummy } from './dummy'

class _ {
  data: AppearanceData

  constructor() {
    this.data = Dummy.appearanceData
    this.registerThemeEventListener()
  }

  onChangeTheme(theme: Theme): any {}

  private onChangeThemeInternal(theme: Theme): boolean {
    this.data.theme = theme
    Logger.debug('Appearance', 'onChangeThemeInternal', `The theme has been set to ${theme}.`)

    return this.onChangeTheme(theme)
  }

  async initialize(): Promise<boolean> {
    this.onChangeTheme(this.themeByPrefersColorScheme)

    if (Environment.isWindowDefined) {
      let get: boolean

      get = LocalStorage.get(LocalStorageName.APPEARANCE, this.data)
      if (!get) return false

      this.onChangeTheme(this.data.theme)
    }

    return true
  }

  async toggleTheme(): Promise<boolean> {
    switch (this.data.theme) {
      case Theme.DARK:
        return this.onChangeThemeInternal(Theme.LIGHT)
      case Theme.LIGHT:
        return this.onChangeThemeInternal(Theme.DARK)
      case Theme.SYSTEM:
        return this.onChangeThemeInternal(this.themeByPrefersColorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    }
  }

  async setTheme(theme: Theme): Promise<boolean> {
    switch (theme) {
      case Theme.DARK:
      case Theme.LIGHT:
        this.onChangeThemeInternal(theme)
        break
      case Theme.SYSTEM:
        this.setThemeByPrefersColorScheme()
        break
    }

    if (Environment.isWindowDefined) {
      return LocalStorage.set(LocalStorageName.APPEARANCE, this.data)
    }

    return true
  }

  setThemeByPrefersColorScheme(): boolean {
    if (this.isThemeSystem) {
      this.data.theme = Theme.SYSTEM
      Logger.debug('Appearance', 'onChangeThemeInternal', `The theme has been set to ${Theme.SYSTEM}.`)

      this.onChangeTheme(this.themeByPrefersColorScheme)

      return true
    }

    return false
  }

  private registerThemeEventListener(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (v: MediaQueryListEvent) => this.setThemeByPrefersColorScheme())
  }

  get themeByPrefersColorScheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT
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
}

export const Appearance = new _()
