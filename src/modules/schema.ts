import * as S from 'superstruct'
import { InputFileItem } from '../definitions/interfaces'

/**
 * @category Module
 */
export class Schema {
  static get any(): S.Struct {
    return S.any()
  }

  static get inputFileItemOptional(): S.Describe<InputFileItem> {
    return S.object({
      data: S.string(),
      id: S.string(),
      name: S.string()
    })
  }

  static get inputFileItemRequired(): S.Describe<InputFileItem> {
    return S.object({
      data: S.size(S.string(), 1, Infinity),
      id: S.size(S.string(), 1, Infinity),
      name: S.size(S.string(), 1, Infinity)
    })
  }
}
