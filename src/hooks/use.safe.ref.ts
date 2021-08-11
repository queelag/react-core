import { ElementTagNameMap, Environment } from '@queelag/core'
import { MutableRefObject, useRef } from 'react'

/**
 * Creates a ref with a fallback K element only if document.createElement is available, otherwise returns an empty object.
 */
export const useSafeRef = <K extends keyof ElementTagNameMap>(tagName: K, options?: ElementCreationOptions): MutableRefObject<ElementTagNameMap[K]> => {
  return useRef(Environment.isWindowDefined ? document.createElement(tagName, options) : ({ current: {} } as any))
}
