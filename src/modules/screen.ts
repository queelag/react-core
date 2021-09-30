import { Environment } from '@queelag/core'

export class Screen {
  static height: number = Environment.isWindowDefined ? window.innerHeight : 0
  static width: number = Environment.isWindowDefined ? window.innerWidth : 0

  static get isMobile(): boolean {
    return this.isTiny
  }

  static get isTablet(): boolean {
    return this.isMedium
  }

  static get isDesktop(): boolean {
    return this.isLarge
  }

  static get isTiny(): boolean {
    return this.width < 640
  }

  static get isSmall(): boolean {
    return this.width >= 640
  }

  static get isMedium(): boolean {
    return this.width >= 768
  }

  static get isLarge(): boolean {
    return this.width >= 1024
  }

  static get isExtraLarge(): boolean {
    return this.width >= 1280
  }
}
