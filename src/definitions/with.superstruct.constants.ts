import { CheckBoxProps, InputFileProps, InputProps, SelectProps, SwitchProps } from './with.superstruct.props'

/** @category Constant */
export const CHECK_BOX_PROPS_KEYS: (keyof CheckBoxProps<any>)[] = ['disabled', 'label', 'layer', 'path', 'required', 'store', 'touched']
/** @category Constant */
export const INPUT_PROPS_KEYS: (keyof InputProps<any>)[] = ['label', 'layer', 'path', 'prefix', 'required', 'schema', 'store', 'suffix', 'touched', 'type']
/** @category Constant */
export const INPUT_FILE_PROPS_KEYS: (keyof InputFileProps<any>)[] = ['label', 'layer', 'mode', 'path', 'required', 'store']
/** @category Constant */
export const SELECT_PROPS_KEYS: (keyof SelectProps<any>)[] = ['disabled', 'label', 'layer', 'mode', 'options', 'path', 'placeholder', 'required', 'store']
/** @category Constant */
export const SWITCH_PROPS_KEYS: (keyof SwitchProps<any>)[] = ['disabled', 'label', 'path', 'store']
