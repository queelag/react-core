import { CheckBoxStore } from '../stores/check.box.store'
import { InputFileStore } from '../stores/input.file.store'
import { InputStore } from '../stores/input.store'
import { SelectStore } from '../stores/select.store'
import { SwitchStore } from '../stores/switch.store'
import { COMPONENT_STORE_KEYS } from './constants'
import { WithFormFieldProps } from './with.superstruct.interfaces'
import { CheckBoxProps, InputFileProps, InputProps, SelectProps, SwitchProps } from './with.superstruct.props'

/** @category Constant */
export const WITH_FORM_FIELD_PROPS_KEYS: (keyof WithFormFieldProps<any>)[] = [
  'disabled',
  'label',
  'layer',
  'path',
  // 'placeholder',
  'required',
  'schema',
  'store',
  'touched'
]

/** @category Constant */
export const COMPONENT_FORM_FIELD_STORE_KEYS: any[] = [...COMPONENT_STORE_KEYS, ...WITH_FORM_FIELD_PROPS_KEYS]

/** @category Constant */
export const CHECK_BOX_PROPS_KEYS: (keyof CheckBoxProps<any>)[] = WITH_FORM_FIELD_PROPS_KEYS

/** @category Constant */
export const CHECK_BOX_STORE_KEYS: (keyof CheckBoxProps<any> & keyof CheckBoxStore<any>)[] = COMPONENT_FORM_FIELD_STORE_KEYS

/** @category Constant */
export const INPUT_PROPS_KEYS: (keyof InputProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'prefix', 'suffix', 'type']

/** @category Constant */
export const INPUT_STORE_KEYS: (keyof InputProps<any> & keyof InputStore<any>)[] = [...COMPONENT_FORM_FIELD_STORE_KEYS, 'type']

/** @category Constant */
export const INPUT_FILE_PROPS_KEYS: (keyof InputFileProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode']

/** @category Constant */
export const INPUT_FILE_STORE_KEYS: (keyof InputFileProps<any> & keyof InputFileStore<any>)[] = [...COMPONENT_FORM_FIELD_STORE_KEYS, 'mode']

/** @category Constant */
export const SELECT_PROPS_KEYS: (keyof SelectProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode', 'options']

/** @category Constant */
export const SELECT_STORE_KEYS: (keyof SelectProps<any> & keyof SelectStore<any>)[] = [...COMPONENT_FORM_FIELD_STORE_KEYS, 'mode', 'options']

/** @category Constant */
export const SWITCH_PROPS_KEYS: (keyof SwitchProps<any>)[] = WITH_FORM_FIELD_PROPS_KEYS

/** @category Constant */
export const SWITCH_STORE_KEYS: (keyof SwitchProps<any> & keyof SwitchStore<any>)[] = COMPONENT_FORM_FIELD_STORE_KEYS
