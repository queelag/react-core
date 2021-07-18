import {
  AlertProps,
  AvatarProps,
  BackdropProps,
  BadgeProps,
  BottomSheetProps,
  BottomTabberProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  ColorableDivProps,
  ContextMenuProps,
  DialogProps,
  DividerProps,
  EmptyProps,
  FormProps,
  HeaderProps,
  IconProps,
  ImageProps,
  InputFileProps,
  InputProps,
  LabelProps,
  ListItemProps,
  ListProps,
  LoadingProps,
  ModalProps,
  OnboardingProps,
  ResultProps,
  RouterRendererProps,
  SelectProps,
  SettingProps,
  SidebarProps,
  SpinnerProps,
  StatisticProps,
  SwitchProps,
  TagProps,
  TopTabberProps,
  VirtualizedListItemProps,
  VirtualizedListProps,
  WizardProps
} from './props'

/** @category Constant */
export const ALERT_PROPS_KEYS: (keyof AlertProps)[] = ['description', 'title', 'type']
/** @category Constant */
export const AVATAR_PROPS_KEYS: (keyof AvatarProps)[] = ['background', 'color', 'icon', 'layer', 'ratio', 'shape', 'size', 'source', 'text', 'thickness']
/** @category Constant */
export const BACKDROP_PROPS_KEYS: (keyof BackdropProps)[] = ['opacity']
/** @category Constant */
export const BADGE_PROPS_KEYS: (keyof BadgeProps)[] = ['value']
/** @category Constant */
export const BOTTOM_SHEET_PROPS_KEYS: (keyof BottomSheetProps)[] = ['items', 'name', 'title']
/** @category Constant */
export const BOTTOM_TABBER_PROPS_KEYS: (keyof BottomTabberProps)[] = ['items', 'router']
/** @category Constant */
export const BUTTON_PROPS_KEYS: (keyof ButtonProps)[] = ['background', 'color', 'icon', 'layer', 'shape', 'size', 'spinning', 'submit', 'title', 'type']
/** @category Constant */
export const CARD_PROPS_KEYS: (keyof CardProps)[] = ['header', 'layer', 'footer', 'title']
/** @category Constant */
export const CHECK_BOX_PROPS_KEYS: (keyof CheckboxProps<any>)[] = ['disabled', 'label', 'layer', 'path', 'required', 'store', 'touched']
/** @category Constant */
export const COLOR_DIV_PROPS_KEYS: (keyof ColorableDivProps)[] = ['background', 'border', 'divide', 'layer', 'text']
/** @category Constant */
export const CONTEXT_MENU_PROPS_KEYS: (keyof ContextMenuProps)[] = ['items', 'name']
/** @category Constant */
export const DIALOG_PROPS_KEYS: (keyof DialogProps)[] = ['button', 'onClickConfirm']
/** @category Constant */
export const DIVIDER_PROPS_KEYS: (keyof DividerProps)[] = ['color', 'layer', 'type']
/** @category Constant */
export const EMPTY_PROPS_KEYS: (keyof EmptyProps)[] = ['layer']
/** @category Constant */
export const FORM_PROPS_KEYS: (keyof FormProps)[] = ['layer']
/** @category Constant */
export const HEADER_PROPS_KEYS: (keyof HeaderProps)[] = ['logo', 'router', 'title']
/** @category Constant */
export const ICON_PROPS_KEYS: (keyof IconProps)[] = ['color', 'fill', 'layer', 'size', 'stroke', 'svg', 'thickness']
/** @category Constant */
export const IMAGE_EMPTY_BASE64: string = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
/** @category Constant */
export const IMAGE_EMPTY_TYPE: string = 'image/png'
/** @category Constant */
export const IMAGE_PROPS_KEYS: (keyof ImageProps)[] = ['fallback', 'orientation', 'ratio', 'shape', 'size', 'source']
/** @category Constant */
export const INPUT_FILE_PROPS_KEYS: (keyof InputFileProps<any>)[] = ['label', 'layer', 'mode', 'onChangeCallback', 'path', 'required', 'store']
/** @category Constant */
export const INPUT_PROPS_KEYS: (keyof InputProps<any>)[] = [
  'label',
  'layer',
  'onBlurCallback',
  'onChangeCallback',
  'onFocusCallback',
  'path',
  'prefix',
  'required',
  'schema',
  'store',
  'suffix',
  'touched',
  'type'
]
/** @category Constant */
export const LABEL_PROPS_KEYS: (keyof LabelProps)[] = ['color', 'inject', 'layer', 'path']
/** @category Constant */
export const LIST_PROPS_KEYS: (keyof ListProps<any>)[] = ['items', 'renderItem']
/** @category Constant */
export const LIST_ITEM_PROPS_KEYS: (keyof ListItemProps)[] = ['avatar', 'description', 'isFirst', 'isLast', 'layer', 'title']
/** @category Constant */
export const LOADING_PROPS_KEYS: (keyof LoadingProps)[] = ['title']
/** @category Constant */
export const MODAL_PROPS_KEYS: (keyof ModalProps)[] = ['name', 'title']
/** @category Constant */
export const ONBOARDING_PROPS_KEYS: (keyof OnboardingProps)[] = ['items', 'onEnd']
/** @category Constant */
export const RESULT_PROPS_KEYS: (keyof ResultProps)[] = ['description', 'icon', 'image', 'title', 'type']
/** @category Constant */
export const ROUTER_PROPS_KEYS: (keyof RouterRendererProps)[] = ['fallback', 'map']
/** @category Constant */
export const SELECT_PROPS_KEYS: (keyof SelectProps<any>)[] = ['disabled', 'label', 'layer', 'mode', 'options', 'path', 'placeholder', 'required', 'store']
/** @category Constant */
export const SETTING_PROPS_KEYS: (keyof SettingProps)[] = ['description', 'layer', 'title']
/** @category Constant */
export const SIDEBAR_PROPS_KEYS: (keyof SidebarProps)[] = ['footer', 'items', 'router']
/** @category Constant */
export const SPINNER_PROPS_KEYS: (keyof SpinnerProps)[] = ['color', 'size']
/** @category Constant */
export const STATISTIC_PROPS_KEYS: (keyof StatisticProps)[] = ['feedback', 'icon', 'layer', 'progress', 'reference', 'title', 'value']
/** @category Constant */
export const SWITCH_PROPS_KEYS: (keyof SwitchProps<any>)[] = ['disabled', 'label', 'layer', 'path', 'store']
/** @category Constant */
export const TAG_PROPS_KEYS: (keyof TagProps)[] = ['background', 'color', 'destroyable', 'icon', 'layer', 'onDestroyCallback', 'text']
/** @category Constant */
export const TOP_TABBER_PROPS_KEYS: (keyof TopTabberProps)[] = ['active', 'items']
/** @category Constant */
export const VIRTUALIZED_LIST_PROPS_KEYS: (keyof VirtualizedListProps<any>)[] = [
  'dummy',
  'empty',
  'gutter',
  'itemParentProps',
  'items',
  'orientation',
  'renderItem'
]
/** @category Constant */
export const VIRTUALIZED_LIST_ITEM_PROPS_KEYS: (keyof VirtualizedListItemProps<any>)[] = ['renderItem']
/** @category Constant */
export const WIZARD_PROPS_KEYS: (keyof WizardProps)[] = ['active', 'onStepChange', 'steps']
