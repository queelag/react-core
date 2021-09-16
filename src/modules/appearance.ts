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

  initialize(): boolean {
    this.setTheme(Theme.SYSTEM, false)

    if (Environment.isWindowDefined) {
      let get: boolean

      get = LocalStorage.get(LocalStorageName.APPEARANCE, this.data)
      if (!get) return false

      this.setTheme(this.data.theme, false)
    }

    return true
  }

  toggleTheme(): boolean {
    switch (this.data.theme) {
      case Theme.DARK:
        return this.setTheme(Theme.LIGHT)
      case Theme.LIGHT:
        return this.setTheme(Theme.DARK)
      case Theme.SYSTEM:
        return this.setTheme(this.themeByPrefersColorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    }
  }

  setTheme(theme: Theme, store: boolean = true): boolean {
    this.data.theme = theme
    Logger.debug('Appearance', 'setTheme', `The theme has been set to ${theme}.`)

    switch (theme) {
      case Theme.DARK:
      case Theme.LIGHT:
        this.onChangeTheme(theme)
        break
      case Theme.SYSTEM:
        this.onChangeTheme(this.themeByPrefersColorScheme)
        break
    }

    if (Environment.isWindowDefined && store) {
      return LocalStorage.set(LocalStorageName.APPEARANCE, this.data)
    }

    return true
  }

  private registerThemeEventListener(): void {
    let media: MediaQueryList

    if (typeof window.matchMedia === 'undefined') {
      Logger.warn('Appearance', 'registerThemeEventListener', `window.matchMedia is not defined.`)
      return
    }

    media = window.matchMedia('(prefers-color-scheme: dark)')
    if (typeof media.addEventListener !== 'function')
      return Logger.warn('Appearance', 'registerThemeEventListener', `window.matchMedia.addEventListener is not defined.`)

    media.addEventListener('change', (v: MediaQueryListEvent) => this.isThemeSystem && this.setTheme(Theme.SYSTEM, false))
  }

  get themeByPrefersColorScheme(): Theme {
    if (typeof window.matchMedia === 'undefined') {
      Logger.warn('Appearance', 'themeByPrefersColorScheme', `window.matchMedia is not defined.`)
      return Theme.LIGHT
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT
  }

  get isThemeDark(): boolean {
    switch (this.data.theme) {
      case Theme.DARK:
        return true
      case Theme.LIGHT:
        return false
      case Theme.SYSTEM:
        return this.themeByPrefersColorScheme === Theme.DARK
    }
  }

  get isThemeLight(): boolean {
    switch (this.data.theme) {
      case Theme.DARK:
        return false
      case Theme.LIGHT:
        return true
      case Theme.SYSTEM:
        return this.themeByPrefersColorScheme === Theme.LIGHT
    }
  }

  get isThemeSystem(): boolean {
    return this.data.theme === Theme.SYSTEM
  }
}

export const Appearance = new _()
