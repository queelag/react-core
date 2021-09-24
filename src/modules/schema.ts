import * as S from 'superstruct'

/**
 * @category Module
 */
export class Schema {
  static enum(_enum: any) {
    return S.define('enum', (v: unknown) => (Object.values(_enum).includes(v) ? true : { message: `Must be one of ${Object.values(_enum).join(', ')}.` }))
  }

  static get any() {
    return S.any()
  }

  static get inputFileItemOptional() {
    return S.object({
      base64: S.string(),
      buffer: S.instance(ArrayBuffer),
      id: S.string(),
      name: S.string(),
      size: S.number(),
      timestamp: S.number(),
      type: S.string()
    })
  }

  static get inputFileItemRequired() {
    return S.object({
      base64: S.size(S.string(), 1, Infinity),
      buffer: S.instance(ArrayBuffer),
      id: S.size(S.string(), 1, Infinity),
      name: S.size(S.string(), 1, Infinity),
      size: S.size(S.number(), 1, Infinity),
      timestamp: S.size(S.number(), 1, Infinity),
      type: S.size(S.string(), 1, Infinity)
    })
  }

  static get requiredString() {
    return S.size(S.string(), 1, Number.MAX_SAFE_INTEGER)
  }

  static get S() {
    return S
  }
}
