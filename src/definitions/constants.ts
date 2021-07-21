import {
  AlertProps,
  AvatarProps,
  BackdropProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  ColorableDivProps,
  DialogProps,
  DividerProps,
  EmptyProps,
  FormProps,
  IconProps,
  ImageProps,
  ListItemProps,
  ListProps,
  LoadingProps,
  LocalizableLabelProps,
  LocalizableSpanProps,
  LocalizableTextProps,
  OnboardingProps,
  ResultProps,
  SettingProps,
  SpinnerProps,
  StatisticProps,
  TagProps,
  VirtualizedListProps,
  WizardProps
} from './props'

/** @category Constant */
export const ALERT_PROPS_KEYS: (keyof AlertProps)[] = ['description', 'title', 'type']
/** @category Constant */
export const AVATAR_PROPS_KEYS: (keyof AvatarProps)[] = [
  'background',
  'color',
  'icon',
  'iconProps',
  'image',
  'imageProps',
  'layer',
  'shape',
  'size',
  'text',
  'textProps'
]
/** @category Constant */
export const BACKDROP_PROPS_KEYS: (keyof BackdropProps)[] = ['opacity']
/** @category Constant */
export const BADGE_PROPS_KEYS: (keyof BadgeProps)[] = ['value']
/** @category Constant */
export const BUTTON_PROPS_KEYS: (keyof ButtonProps)[] = ['background', 'color', 'destructive', 'icon', 'layer', 'shape', 'size', 'spinning', 'title', 'variant']
/** @category Constant */
export const CARD_PROPS_KEYS: (keyof CardProps)[] = ['header', 'layer', 'footer', 'title']
/** @category Constant */
export const COLOR_DIV_PROPS_KEYS: (keyof ColorableDivProps)[] = ['background', 'border', 'divide', 'layer', 'text']
/** @category Constant */
export const DIALOG_PROPS_KEYS: (keyof DialogProps)[] = ['buttons', 'description', 'footer', 'header', 'onHide', 'onShow', 'title']
/** @category Constant */
export const DIVIDER_PROPS_KEYS: (keyof DividerProps)[] = ['color', 'layer', 'orientation']
/** @category Constant */
export const EMPTY_PROPS_KEYS: (keyof EmptyProps)[] = ['description', 'layer', 'title']
/** @category Constant */
export const FORM_PROPS_KEYS: (keyof FormProps)[] = []
/** @category Constant */
export const ICON_PROPS_KEYS: (keyof IconProps)[] = ['color', 'layer', 'size', 'svg', 'thickness']
/** @category Constant */
export const IMAGE_EMPTY_BASE64: string = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
/** @category Constant */
export const IMAGE_EMPTY_TYPE: string = 'image/png'
/** @category Constant */
export const IMAGE_PROPS_KEYS: (keyof ImageProps)[] = ['fallback', 'orientation', 'ratio', 'shape', 'size', 'source']
/** @category Constant */
export const LIST_PROPS_KEYS: (keyof ListProps<any>)[] = ['empty', 'items', 'renderItem']
/** @category Constant */
export const LIST_ITEM_PROPS_KEYS: (keyof ListItemProps)[] = ['avatar', 'description', 'image', 'layer', 'title']
/** @category Constant */
export const LOADING_PROPS_KEYS: (keyof LoadingProps)[] = ['description', 'title']
/** @category Constant */
export const LOCALIZABLE_LABEL_PROPS_KEYS: (keyof LocalizableLabelProps)[] = ['color', 'inject', 'layer', 'path']
/** @category Constant */
export const LOCALIZABLE_SPAN_PROPS_KEYS: (keyof LocalizableSpanProps)[] = ['color', 'inject', 'layer', 'path']
/** @category Constant */
export const LOCALIZABLE_TEXT_PROPS_KEYS: (keyof LocalizableTextProps)[] = ['color', 'element', 'inject', 'layer', 'path']
/** @category Constant */
export const ONBOARDING_PROPS_KEYS: (keyof OnboardingProps)[] = ['active', 'items', 'onEnd']
/** @category Constant */
export const RESULT_PROPS_KEYS: (keyof ResultProps)[] = ['description', 'icon', 'title', 'type']
/** @category Constant */
export const SETTING_PROPS_KEYS: (keyof SettingProps)[] = ['description', 'layer', 'title']
/** @category Constant */
export const SPINNER_PROPS_KEYS: (keyof SpinnerProps)[] = ['color', 'layer', 'size', 'thickness']
/** @category Constant */
export const STATISTIC_PROPS_KEYS: (keyof StatisticProps)[] = ['icon', 'layer', 'progress', 'reference', 'title', 'type', 'value']
/** @category Constant */
export const TAG_PROPS_KEYS: (keyof TagProps)[] = ['background', 'color', 'destroyable', 'icon', 'layer', 'onDestroy', 'text']
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
export const WIZARD_PROPS_KEYS: (keyof WizardProps)[] = ['active', 'onStepChange', 'steps']
