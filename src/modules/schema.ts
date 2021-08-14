import * as S from 'superstruct'

/**
 * @category Module
 */
export class Schema {
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
}
