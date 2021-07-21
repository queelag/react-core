import { Localization, ObjectUtils } from '@queelag/core'
import React from 'react'
import { LOCALIZABLE_TEXT_PROPS_KEYS } from '../definitions/constants'
import { HTMLElementProps, LocalizableTextProps } from '../definitions/props'
import { ColorPicker } from '../pickers/color.picker'
import { ReactUtils } from '../utils/react.utils'

export function LocalizableText(props: HTMLElementProps & LocalizableTextProps) {
  const renderLocalized = () => (
    <props.element
      {...ObjectUtils.omit(props, LOCALIZABLE_TEXT_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, ColorPicker.textByString(props.color || '', props.layer))}
      dangerouslySetInnerHTML={{ __html: Localization.get(props.path || '', props.inject) }}
    />
  )

  const renderChildren = () => (
    <props.element
      {...ObjectUtils.omit(props, LOCALIZABLE_TEXT_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, ColorPicker.textByString(props.color || '', props.layer))}
    >
      {props.children}
    </props.element>
  )

  return props.path ? renderLocalized() : renderChildren()
}
