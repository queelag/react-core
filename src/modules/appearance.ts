import { Environment, LocalStorage, Storage } from '@queelag/core'
import { LocalStorageName, Theme } from '../definitions/enums'
import { AppearanceData } from '../definitions/interfaces'
import { ModuleLogger } from '../loggers/module.logger'
import { Dummy } from './dummy'

class _ {
  data: AppearanceData
  storage: Storage

  constructor() {
    this.data = Dummy.appearanceData
    this.storage = LocalStorage

    this.registerThemeEventListener()
  }

  onChangeTheme(theme: Theme): any {}

  async initialize(): Promise<boolean> {
    this.setTheme(Theme.SYSTEM, false)

    if (Environment.isWindowDefined) {
      let get: AppearanceData | Error

      get = await this.storage.get(LocalStorageName.APPEARANCE, this.data)
      if (!get) return false

      this.setTheme(this.data.theme, false)
    }

    return true
  }

  async toggleTheme(): Promise<boolean> {
    switch (this.data.theme) {
      case Theme.DARK:
        return this.setTheme(Theme.LIGHT)
      case Theme.LIGHT:
        return this.setTheme(Theme.DARK)
      case Theme.SYSTEM:
        return this.setTheme(this.themeByPrefersColorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    }
  }

  async setTheme(theme: Theme, store: boolean = true): Promise<boolean> {
    this.data.theme = theme
    ModuleLogger.debug('Appearance', 'setTheme', `The theme has been set to ${theme}.`)

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
      let storage: void | Error

      storage = await this.storage.set(LocalStorageName.APPEARANCE, this.data)
      if (storage instanceof Error) return false

      return true
    }

    return true
  }

  private registerThemeEventListener(): void {
    let media: MediaQueryList

    if (Environment.isWindowNotDefined) {
      return ModuleLogger.warn('Appearance', 'registerThemeEventListener', `The window is not defined.`)
    }

    if (typeof window.matchMedia === 'undefined') {
      return ModuleLogger.warn('Appearance', 'registerThemeEventListener', `The window.matchMedia function is not defined.`)
    }

    media = window.matchMedia('(prefers-color-scheme: dark)')
    if (typeof media.addEventListener !== 'function')
      return ModuleLogger.warn('Appearance', 'registerThemeEventListener', `The window.matchMedia.addEventListener function is not defined.`)

    media.addEventListener('change', (v: MediaQueryListEvent) => this.isThemeSystem && this.setTheme(Theme.SYSTEM, false))
  }

  get themeByPrefersColorScheme(): Theme {
    if (Environment.isWindowNotDefined) {
      ModuleLogger.warn('Appearance', 'themeByPrefersColorScheme', `window is not defined.`)
      return Theme.LIGHT
    }

    if (typeof window.matchMedia === 'undefined') {
      ModuleLogger.warn('Appearance', 'themeByPrefersColorScheme', `window.matchMedia is not defined.`)
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
