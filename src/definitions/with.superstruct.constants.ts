import type { CheckBoxStore } from '../stores/check.box.store'
import type { InputFileStore } from '../stores/input.file.store'
import type { InputStore } from '../stores/input.store'
import type { SelectStore } from '../stores/select.store'
import type { SwitchStore } from '../stores/switch.store'
import type { TextAreaStore } from '../stores/text.area.store'
import { WithFormFieldProps } from './with.superstruct.interfaces'
import { CheckBoxProps, InputFileProps, InputProps, SelectProps, SwitchProps, TextAreaProps } from './with.superstruct.props'

/** @category Constant */
export const WITH_FORM_FIELD_PROPS_KEYS: (keyof WithFormFieldProps<any, any, any>)[] = [
  'disabled',
  'getStore',
  'icon',
  'label',
  'layer',
  'path',
  'required',
  'schema',
  'store',
  'touched'
]

/** @category Constant */
export const CHECK_BOX_PROPS_KEYS: (keyof CheckBoxProps<any>)[] = WITH_FORM_FIELD_PROPS_KEYS

/** @category Constant */
export const CHECK_BOX_STORE_KEYS: (keyof CheckBoxProps<any> & keyof CheckBoxStore<any>)[] = []

/** @category Constant */
export const INPUT_PROPS_KEYS: (keyof InputProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode', 'prefix', 'suffix', 'touchTrigger', 'type']

/** @category Constant */
export const INPUT_STORE_KEYS: (keyof InputProps<any> & keyof InputStore<any>)[] = ['mode', 'touchTrigger', 'type']

/** @category Constant */
export const INPUT_FILE_PROPS_KEYS: (keyof InputFileProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode']

/** @category Constant */
export const INPUT_FILE_STORE_KEYS: (keyof InputFileProps<any> & keyof InputFileStore<any>)[] = ['mode']

/** @category Constant */
export const SELECT_PROPS_KEYS: (keyof SelectProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode', 'options']

/** @category Constant */
export const SELECT_STORE_KEYS: (keyof SelectProps<any> & keyof SelectStore<any>)[] = ['mode', 'options']

/** @category Constant */
export const SWITCH_PROPS_KEYS: (keyof SwitchProps<any>)[] = WITH_FORM_FIELD_PROPS_KEYS

/** @category Constant */
export const SWITCH_STORE_KEYS: (keyof SwitchProps<any> & keyof SwitchStore<any>)[] = []

/** @category Constant */
export const TEXT_AREA_PROPS_KEYS: (keyof TextAreaProps<any>)[] = [...WITH_FORM_FIELD_PROPS_KEYS, 'mode', 'touchTrigger']

/** @category Constant */
export const TEXT_AREA_STORE_KEYS: (keyof TextAreaProps<any> & keyof TextAreaStore<any>)[] = ['mode', 'touchTrigger']
