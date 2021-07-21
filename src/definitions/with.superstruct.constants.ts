import { WithFormFieldProps } from './with.superstruct.interfaces'
import { CheckBoxProps, InputFileProps, InputProps, SelectProps, SwitchProps } from './with.superstruct.props'

/** @category Constant */
export const WITH_FORM_FIELD_PROPS_KEYS: (keyof WithFormFieldProps<any>)[] = [
  'disabled',
  'label',
  'layer',
  'path',
  'placeholder',
  'required',
  'schema',
  'store',
  'touched'
]

/** @category Constant */
export const CHECK_BOX_PROPS_KEYS: (keyof CheckBoxProps<any>)[] = WITH_FORM_FIELD_PROPS_KEYS
/** @category Constant */
export const INPUT_PROPS_KEYS: (keyof InputProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'prefix', 'suffix', 'type']
/** @category Constant */
export const INPUT_FILE_PROPS_KEYS: (keyof InputFileProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode']
/** @category Constant */
export const SELECT_PROPS_KEYS: (keyof SelectProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode', 'options']
/** @category Constant */
export const SWITCH_PROPS_KEYS: (keyof SwitchProps<any>)[] = WITH_FORM_FIELD_PROPS_KEYS
