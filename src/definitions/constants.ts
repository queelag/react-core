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
  ColorDivProps,
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

export const ALERT_PROPS_KEYS: (keyof AlertProps)[] = ['description', 'title', 'type']
export const AVATAR_PROPS_KEYS: (keyof AvatarProps)[] = ['background', 'color', 'icon', 'layer', 'ratio', 'shape', 'size', 'source', 'text', 'thickness']
export const BACKDROP_PROPS_KEYS: (keyof BackdropProps)[] = ['opacity']
export const BADGE_PROPS_KEYS: (keyof BadgeProps)[] = ['value']
export const BOTTOM_SHEET_PROPS_KEYS: (keyof BottomSheetProps)[] = ['items', 'name', 'title']
export const BOTTOM_TABBER_PROPS_KEYS: (keyof BottomTabberProps)[] = ['items', 'router']
export const BUTTON_PROPS_KEYS: (keyof ButtonProps)[] = ['background', 'color', 'icon', 'layer', 'shape', 'size', 'spinning', 'submit', 'title', 'type']
export const CARD_PROPS_KEYS: (keyof CardProps)[] = ['header', 'layer', 'footer', 'title']
export const CHECK_BOX_PROPS_KEYS: (keyof CheckboxProps<any>)[] = ['disabled', 'label', 'layer', 'path', 'required', 'store', 'touched']
export const COLOR_DIV_PROPS_KEYS: (keyof ColorDivProps)[] = ['background', 'border', 'divide', 'layer', 'text']
export const CONTEXT_MENU_PROPS_KEYS: (keyof ContextMenuProps)[] = ['items', 'name']
export const DIALOG_PROPS_KEYS: (keyof DialogProps)[] = ['button', 'onClickConfirm']
export const DIVIDER_PROPS_KEYS: (keyof DividerProps)[] = ['color', 'layer', 'type']
export const EMPTY_PROPS_KEYS: (keyof EmptyProps)[] = ['layer']
export const FORM_PROPS_KEYS: (keyof FormProps)[] = ['layer']
export const HEADER_PROPS_KEYS: (keyof HeaderProps)[] = ['logo', 'router', 'title']
export const ICON_PROPS_KEYS: (keyof IconProps)[] = ['color', 'fill', 'layer', 'size', 'stroke', 'svg', 'thickness']
export const IMAGE_PROPS_KEYS: (keyof ImageProps)[] = ['fallback', 'heightRatio', 'shape', 'size', 'source', 'widthRatio']
export const INPUT_FILE_PROPS_KEYS: (keyof InputFileProps<any>)[] = ['label', 'layer', 'mode', 'onChangeCallback', 'path', 'required', 'store']
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
export const LABEL_PROPS_KEYS: (keyof LabelProps)[] = ['color', 'inject', 'layer', 'path']
export const LIST_PROPS_KEYS: (keyof ListProps<any>)[] = ['items', 'renderItem']
export const LIST_ITEM_PROPS_KEYS: (keyof ListItemProps)[] = ['avatar', 'description', 'isFirst', 'isLast', 'layer', 'title']
export const LOADING_PROPS_KEYS: (keyof LoadingProps)[] = ['title']
export const MODAL_PROPS_KEYS: (keyof ModalProps)[] = ['button', 'name', 'title']
export const ONBOARDING_PROPS_KEYS: (keyof OnboardingProps)[] = ['items', 'onEnd']
export const RESULT_PROPS_KEYS: (keyof ResultProps)[] = ['description', 'icon', 'image', 'title', 'type']
export const ROUTER_PROPS_KEYS: (keyof RouterRendererProps)[] = ['fallback', 'map']
export const SELECT_PROPS_KEYS: (keyof SelectProps<any>)[] = ['disabled', 'label', 'layer', 'mode', 'options', 'path', 'placeholder', 'required', 'store']
export const SETTING_PROPS_KEYS: (keyof SettingProps)[] = ['description', 'layer', 'title']
export const SIDEBAR_PROPS_KEYS: (keyof SidebarProps)[] = ['footer', 'items', 'logo', 'router']
export const SPINNER_PROPS_KEYS: (keyof SpinnerProps)[] = ['color', 'size']
export const STATISTIC_PROPS_KEYS: (keyof StatisticProps)[] = ['feedback', 'icon', 'layer', 'progress', 'reference', 'title', 'value']
export const SWITCH_PROPS_KEYS: (keyof SwitchProps<any>)[] = ['disabled', 'label', 'layer', 'onChangeCallback', 'path', 'store']
export const TAG_PROPS_KEYS: (keyof TagProps)[] = ['background', 'color', 'destroyable', 'icon', 'layer', 'onDestroyCallback', 'text']
export const TOP_TABBER_PROPS_KEYS: (keyof TopTabberProps)[] = ['active', 'items']
export const VIRTUALIZED_LIST_PROPS_KEYS: (keyof VirtualizedListProps<any>)[] = [
  'dummy',
  'empty',
  'gutter',
  'itemParentProps',
  'items',
  'orientation',
  'renderItem'
]
export const VIRTUALIZED_LIST_ITEM_PROPS_KEYS: (keyof VirtualizedListItemProps<any>)[] = ['renderItem']
export const WIZARD_PROPS_KEYS: (keyof WizardProps)[] = ['active', 'epilogue', 'name', 'onStepChange', 'steps']
