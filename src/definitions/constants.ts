import { AvatarStore } from '../stores/avatar.store'
import { BottomTabberStore } from '../stores/bottom.tabber.store'
import { ButtonStore } from '../stores/button.store'
import { DividerStore } from '../stores/divider.store'
import { FormStore } from '../stores/form.store'
import { IconStore } from '../stores/icon.store'
import { ImageStore } from '../stores/image.store'
import { ListStore } from '../stores/list.store'
import { MeterStore } from '../stores/meter.store'
import { OnboardingStore } from '../stores/onboarding.store'
import { SidebarStore } from '../stores/sidebar.store'
import { TagStore } from '../stores/tag.store'
import { TopTabberStore } from '../stores/top.tabber.store'
import { VirtualizedListStore } from '../stores/virtualized.list.store'
import { WizardStore } from '../stores/wizard.store'
import {
  AlertProps,
  AvatarProps,
  BackdropProps,
  BadgeProps,
  BottomSheetProps,
  BottomTabberProps,
  ButtonProps,
  CardProps,
  ColorableDivProps,
  ContextMenuProps,
  DialogProps,
  DisclosureProps,
  DividerProps,
  EmptyProps,
  FormProps,
  HeaderProps,
  IconProps,
  ImageProps,
  ListItemProps,
  ListProps,
  LoadingProps,
  LocalizableLabelProps,
  LocalizableSpanProps,
  LocalizableTextProps,
  MeterProps,
  OnboardingProps,
  ResultProps,
  RouterRendererProps,
  SectionProps,
  SettingProps,
  SidebarProps,
  SpinnerProps,
  StatisticProps,
  TagProps,
  TopTabberProps,
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
export const AVATAR_STORE_KEYS: (keyof AvatarProps & keyof AvatarStore)[] = ['background', 'color']

/** @category Constant */
export const BACKDROP_PROPS_KEYS: (keyof BackdropProps)[] = ['opacity']

/** @category Constant */
export const BADGE_PROPS_KEYS: (keyof BadgeProps)[] = ['value']

/** @category Constant */
export const BOTTOM_SHEET_PROPS_KEYS: (keyof BottomSheetProps<any>)[] = ['header', 'items', 'title']

/** @category Constant */
export const BOTTOM_TABBER_PROPS_KEYS: (keyof BottomTabberProps<any>)[] = ['isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const BOTTOM_TABBER_STORE_KEYS: (keyof BottomTabberProps<any> & keyof BottomTabberStore<any>)[] = ['isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const BUTTON_PROPS_KEYS: (keyof ButtonProps)[] = ['background', 'color', 'destructive', 'icon', 'layer', 'shape', 'size', 'spinning', 'title', 'variant']

/** @category Constant */
export const BUTTON_STORE_KEYS: (keyof ButtonProps & keyof ButtonStore)[] = ['disabled', 'onClick', 'spinning', 'variant']

/** @category Constant */
export const CARD_PROPS_KEYS: (keyof CardProps)[] = ['header', 'layer', 'footer', 'title']

/** @category Constant */
export const COLORABLE_DIV_PROPS_KEYS: (keyof ColorableDivProps)[] = ['background', 'border', 'divide', 'layer', 'text']

/** @category Constant */
export const CONTEXT_MENU_PROPS_KEYS: (keyof ContextMenuProps<any>)[] = ['items']

/** @category Constant */
export const DIALOG_PROPS_KEYS: (keyof DialogProps)[] = ['buttons', 'description', 'footer', 'header', 'onHide', 'onShow', 'title']

/** @category Constant */
export const DISCLOSURE_PROPS_KEYS: (keyof DisclosureProps)[] = ['sections']

/** @category Constant */
export const DIVIDER_PROPS_KEYS: (keyof DividerProps)[] = ['color', 'layer', 'orientation']

/** @category Constant */
export const DIVIDER_STORE_KEYS: (keyof DividerProps & keyof DividerStore)[] = []

/** @category Constant */
export const EMPTY_PROPS_KEYS: (keyof EmptyProps)[] = ['description', 'layer', 'title']

/** @category Constant */
export const FORM_PROPS_KEYS: (keyof FormProps)[] = []

/** @category Constant */
export const FORM_STORE_KEYS: (keyof FormProps & keyof FormStore)[] = ['disabled', 'onSubmit']

/** @category Constant */
export const HEADER_PROPS_KEYS: (keyof HeaderProps)[] = ['canNavigateBack', 'logo', 'onClickBack', 'title']

/** @category Constant */
export const ICON_PROPS_KEYS: (keyof IconProps)[] = ['color', 'layer', 'size', 'source', 'thickness']

/** @category Constant */
export const ICON_STORE_KEYS: (keyof IconProps & keyof IconStore)[] = ['color', 'source', 'thickness']

/** @category Constant */
export const IMAGE_EMPTY_BASE64: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

/** @category Constant */
export const IMAGE_PROPS_KEYS: (keyof ImageProps)[] = ['alpha', 'cache', 'quality', 'shape', 'size', 'source']

/** @category Constant */
export const IMAGE_STORE_KEYS: (keyof ImageProps & keyof ImageStore)[] = ['alpha', 'cache', 'quality', 'source']

/** @category Constant */
export const LIST_PROPS_KEYS: (keyof ListProps<any>)[] = ['empty', 'items', 'renderItem']

/** @category Constant */
export const LIST_STORE_KEYS: (keyof ListProps<any> & keyof ListStore<any>)[] = ['items']

/** @category Constant */
export const LIST_ITEM_PROPS_KEYS: (keyof ListItemProps)[] = ['avatar', 'description', 'image', 'layer', 'title']

/** @category Constant */
export const LOADING_PROPS_KEYS: (keyof LoadingProps)[] = ['description', 'title']

/** @category Constant */
export const LOCALIZABLE_LABEL_PROPS_KEYS: (keyof LocalizableLabelProps<any>)[] = ['color', 'inject', 'layer', 'path']

/** @category Constant */
export const LOCALIZABLE_SPAN_PROPS_KEYS: (keyof LocalizableSpanProps<any>)[] = ['color', 'inject', 'layer', 'path']

/** @category Constant */
export const LOCALIZABLE_TEXT_PROPS_KEYS: (keyof LocalizableTextProps<any>)[] = ['color', 'element', 'inject', 'layer', 'path']

/** @category Constant */
export const METER_PROPS_KEYS: (keyof MeterProps)[] = ['maximum', 'minimum', 'value']

/** @category Constant */
export const METER_STORE_KEYS: (keyof MeterProps & keyof MeterStore)[] = []

/** @category Constant */
export const ONBOARDING_PROPS_KEYS: (keyof OnboardingProps)[] = ['activeItemIndex', 'items', 'onEnd']

/** @category Constant */
export const ONBOARDING_STORE_KEYS: (keyof OnboardingProps & keyof OnboardingStore)[] = ['items', 'onEnd']

/** @category Constant */
export const RESULT_PROPS_KEYS: (keyof ResultProps)[] = ['description', 'icon', 'title', 'type']

/** @category Constant */
export const ROUTER_RENDERER_PROPS_KEYS: (keyof RouterRendererProps)[] = ['fallback', 'map', 'route']

/** @category Constant */
export const SECTION_PROPS_KEYS: (keyof SectionProps)[] = ['description', 'layer', 'title']

/** @category Constant */
export const SETTING_PROPS_KEYS: (keyof SettingProps)[] = ['description', 'layer', 'title']

/** @category Constant */
export const SIDEBAR_PROPS_KEYS: (keyof SidebarProps<any>)[] = ['footer', 'isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const SIDEBAR_STORE_KEYS: (keyof SidebarProps<any> & keyof SidebarStore<any>)[] = ['isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const SPINNER_PROPS_KEYS: (keyof SpinnerProps)[] = ['color', 'layer', 'size', 'thickness']

/** @category Constant */
export const STATISTIC_PROPS_KEYS: (keyof StatisticProps)[] = ['icon', 'layer', 'progress', 'reference', 'title', 'type', 'value']

/** @category Constant */
export const TAG_PROPS_KEYS: (keyof TagProps)[] = ['background', 'color', 'destroyable', 'icon', 'layer', 'text']

/** @category Constant */
export const TAG_STORE_KEYS: (keyof TagProps & keyof TagStore)[] = []

/** @category Constant */
export const TOP_TABBER_PROPS_KEYS: (keyof TopTabberProps)[] = ['activeItemName', 'items']

/** @category Constant */
export const TOP_TABBER_STORE_KEYS: (keyof TopTabberProps & keyof TopTabberStore)[] = ['activeItemName', 'items']

/** @category Constant */
export const VIRTUALIZED_LIST_PROPS_KEYS: (keyof VirtualizedListProps<any>)[] = [
  'dummy',
  'empty',
  'gutter',
  'innerClassName',
  'itemParentProps',
  'items',
  'orientation',
  'renderItem'
]

/** @category Constant */
export const VIRTUALIZED_LIST_STORE_KEYS: (keyof VirtualizedListProps<any> & keyof VirtualizedListStore<any>)[] = ['gutter', 'items']

/** @category Constant */
export const WIZARD_PROPS_KEYS: (keyof WizardProps)[] = ['activeStepName', 'onStepChange', 'steps']

/** @category Constant */
export const WIZARD_STORE_KEYS: (keyof WizardProps & keyof WizardStore)[] = ['activeStepName', 'onStepChange', 'steps']
