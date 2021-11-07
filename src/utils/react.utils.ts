import { ElementTagNameMap, Environment } from '@queelag/core'
import { MutableRefObject } from 'react'

/**
 * Utils for anything related to React.
 *
 * @category Utility
 */
export class ReactUtils {
  /** @hidden */
  constructor() {}

  /**
   * Creates a dummy ref safely.
   */
  static createDummyRef<K extends keyof ElementTagNameMap>(tagName: K, options?: ElementCreationOptions): MutableRefObject<ElementTagNameMap[K]> {
    return Environment.isWindowDefined ? { current: document.createElement(tagName, options) } : ({ current: {} } as any)
  }

  /**
   * Joins an array of classNames to a well formatted string without values that are not strings.
   */
  static joinClassNames(...classNames: any[]): string {
    return classNames
      .filter((v: string) => typeof v === 'string' && v.length > 0)
      .join(' ')
      .replace(/ {2,}/gm, ' ')
  }
}
