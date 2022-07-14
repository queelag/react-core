import type { AvatarStore } from '../stores/avatar.store'
import type { BadgeStore } from '../stores/badge.store'
import type { BottomTabberStore } from '../stores/bottom.tabber.store'
import type { ButtonStore } from '../stores/button.store'
import type { DividerStore } from '../stores/divider.store'
import type { FormStore } from '../stores/form.store'
import type { IconStore } from '../stores/icon.store'
import type { ImageStore } from '../stores/image.store'
import type { ListStore } from '../stores/list.store'
import type { MeterStore } from '../stores/meter.store'
import type { OnboardingStore } from '../stores/onboarding.store'
import type { SidebarStore } from '../stores/sidebar.store'
import type { TagStore } from '../stores/tag.store'
import type { TopTabberStore } from '../stores/top.tabber.store'
import type { VirtualizedListStore } from '../stores/virtualized.list.store'
import type { WizardStore } from '../stores/wizard.store'
import {
  AlertDialogProps,
  AlertProps,
  AvatarProps,
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
export const ALERT_DIALOG_PROPS_KEYS: (keyof AlertDialogProps)[] = [
  'buttons',
  'description',
  'destructive',
  'footer',
  'header',
  'onClickCancel',
  'onClickConfirm',
  'onHide',
  'onShow',
  'title'
]

/** @category Constant */
export const AVATAR_PROPS_KEYS: (keyof AvatarProps)[] = [
  'background',
  'color',
  'getStore',
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
export const BADGE_PROPS_KEYS: (keyof BadgeProps)[] = ['getStore', 'value']

/** @category Constant */
export const BADGE_STORE_KEYS: (keyof BadgeProps & keyof BadgeStore)[] = ['value']

/** @category Constant */
export const BOTTOM_SHEET_PROPS_KEYS: (keyof BottomSheetProps<any>)[] = ['header', 'items', 'title']

/** @category Constant */
export const BOTTOM_TABBER_PROPS_KEYS: (keyof BottomTabberProps<any>)[] = ['getStore', 'isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const BOTTOM_TABBER_STORE_KEYS: (keyof BottomTabberProps<any> & keyof BottomTabberStore<any>)[] = ['isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const BUTTON_PROPS_KEYS: (keyof ButtonProps)[] = [
  'background',
  'color',
  'destructive',
  'getStore',
  'icon',
  'layer',
  'shape',
  'size',
  'spinning',
  'title',
  'tooltip',
  'variant'
]

/** @category Constant */
export const BUTTON_STORE_KEYS: (keyof ButtonProps & keyof ButtonStore)[] = ['disabled', 'onClick', 'spinning', 'variant']

/** @category Constant */
export const CARD_PROPS_KEYS: (keyof CardProps<any>)[] = ['description', 'footer', 'header', 'image', 'imageProps', 'title']

/** @category Constant */
export const COLORABLE_DIV_PROPS_KEYS: (keyof ColorableDivProps)[] = ['background', 'border', 'divide', 'layer', 'text']

/** @category Constant */
export const CONTEXT_MENU_PROPS_KEYS: (keyof ContextMenuProps<any>)[] = ['items']

/** @category Constant */
export const DIALOG_PROPS_KEYS: (keyof DialogProps)[] = ['buttons', 'description', 'footer', 'header', 'onHide', 'onShow', 'title']

/** @category Constant */
export const DISCLOSURE_PROPS_KEYS: (keyof DisclosureProps)[] = ['items']

/** @category Constant */
export const DIVIDER_PROPS_KEYS: (keyof DividerProps)[] = ['color', 'getStore', 'layer', 'orientation']

/** @category Constant */
export const DIVIDER_STORE_KEYS: (keyof DividerProps & keyof DividerStore)[] = []

/** @category Constant */
export const EMPTY_PROPS_KEYS: (keyof EmptyProps)[] = ['description', 'icon', 'iconProps', 'title']

/** @category Constant */
export const FORM_PROPS_KEYS: (keyof FormProps)[] = ['disabled', 'getStore']

/** @category Constant */
export const FORM_STORE_KEYS: (keyof FormProps & keyof FormStore)[] = ['disabled', 'onSubmit']

/** @category Constant */
export const HEADER_PROPS_KEYS: (keyof HeaderProps)[] = ['canNavigateBack', 'description', 'logo', 'onClickBack', 'title']

/** @category Constant */
export const ICON_PROPS_KEYS: (keyof IconProps)[] = ['color', 'getStore', 'layer', 'size', 'src', 'thickness']

/** @category Constant */
export const ICON_STORE_KEYS: (keyof IconProps & keyof IconStore)[] = ['color', 'src', 'thickness']

/** @category Constant */
export const IMAGE_EMPTY_BASE64: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

/** @category Constant */
export const IMAGE_PROPS_KEYS: (keyof ImageProps)[] = ['alpha', 'cache', 'getStore', 'quality', 'shape', 'size']

/** @category Constant */
export const IMAGE_STORE_KEYS: (keyof ImageProps & keyof ImageStore)[] = ['alpha', 'cache', 'quality', 'src']

/** @category Constant */
export const LIST_PROPS_KEYS: (keyof ListProps<any>)[] = ['empty', 'getStore', 'items', 'renderItem']

/** @category Constant */
export const LIST_STORE_KEYS: (keyof ListProps<any> & keyof ListStore<any>)[] = ['items', 'renderItem']

/** @category Constant */
export const LIST_ITEM_PROPS_KEYS: (keyof ListItemProps<any>)[] = ['avatar', 'avatarProps', 'description', 'image', 'imageProps', 'title']

/** @category Constant */
export const LOADING_PROPS_KEYS: (keyof LoadingProps)[] = ['description', 'title']

/** @category Constant */
export const LOCALIZABLE_LABEL_PROPS_KEYS: (keyof LocalizableLabelProps<any>)[] = ['color', 'inject', 'layer', 'path']

/** @category Constant */
export const LOCALIZABLE_SPAN_PROPS_KEYS: (keyof LocalizableSpanProps<any>)[] = ['color', 'inject', 'layer', 'path']

/** @category Constant */
export const LOCALIZABLE_TEXT_PROPS_KEYS: (keyof LocalizableTextProps<any>)[] = ['color', 'element', 'inject', 'layer', 'path']

/** @category Constant */
export const METER_PROPS_KEYS: (keyof MeterProps)[] = ['color', 'maximum', 'minimum', 'shape', 'size', 'value']

/** @category Constant */
export const METER_STORE_KEYS: (keyof MeterProps & keyof MeterStore)[] = ['value']

/** @category Constant */
export const ONBOARDING_PROPS_KEYS: (keyof OnboardingProps)[] = ['activeItemIndex', 'getStore', 'items', 'onEnd']

/** @category Constant */
export const ONBOARDING_STORE_KEYS: (keyof OnboardingProps & keyof OnboardingStore)[] = ['activeItemIndex', 'items', 'onEnd']

/** @category Constant */
export const RESULT_PROPS_KEYS: (keyof ResultProps)[] = ['description', 'icon', 'iconProps', 'title', 'type']

/** @category Constant */
export const SECTION_PROPS_KEYS: (keyof SectionProps)[] = ['description', 'title']

/** @category Constant */
export const SETTING_PROPS_KEYS: (keyof SettingProps)[] = ['description', 'title']

/** @category Constant */
export const SIDEBAR_PROPS_KEYS: (keyof SidebarProps<any>)[] = ['footer', 'getStore', 'header', 'isItemActive', 'items', 'onClickItem', 'title']

/** @category Constant */
export const SIDEBAR_STORE_KEYS: (keyof SidebarProps<any> & keyof SidebarStore<any>)[] = ['isItemActive', 'items', 'onClickItem']

/** @category Constant */
export const SPINNER_PROPS_KEYS: (keyof SpinnerProps)[] = [...ICON_PROPS_KEYS]

/** @category Constant */
export const STATISTIC_PROPS_KEYS: (keyof StatisticProps)[] = ['icon', 'iconProps', 'progress', 'reference', 'title', 'type', 'value']

/** @category Constant */
export const TAG_PROPS_KEYS: (keyof TagProps)[] = ['background', 'color', 'destroyable', 'destroyed', 'getStore', 'icon', 'layer', 'onDestroy']

/** @category Constant */
export const TAG_STORE_KEYS: (keyof TagProps & keyof TagStore)[] = ['destroyable', 'destroyed']

/** @category Constant */
export const TOP_TABBER_PROPS_KEYS: (keyof TopTabberProps)[] = ['activeItemName', 'getStore', 'items']

/** @category Constant */
export const TOP_TABBER_STORE_KEYS: (keyof TopTabberProps & keyof TopTabberStore)[] = ['activeItemName', 'items']

/** @category Constant */
export const VIRTUALIZED_LIST_PROPS_KEYS: (keyof VirtualizedListProps<any>)[] = [
  'dummy',
  'empty',
  'getStore',
  'gutter',
  'innerClassName',
  'itemParentProps',
  'items',
  'renderItem',
  'size'
]

/** @category Constant */
export const VIRTUALIZED_LIST_STORE_KEYS: (keyof VirtualizedListProps<any> & keyof VirtualizedListStore<any>)[] = ['gutter', 'items', 'renderItem']

/** @category Constant */
export const WIZARD_PROPS_KEYS: (keyof WizardProps)[] = ['activeStepName', 'getStore', 'onStepChange', 'steps']

/** @category Constant */
export const WIZARD_STORE_KEYS: (keyof WizardProps & keyof WizardStore)[] = ['activeStepName', 'onStepChange', 'steps']
