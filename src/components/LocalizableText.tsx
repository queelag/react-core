import { Localization, ObjectUtils } from '@queelag/core'
import { Config as SanitizeConfig, sanitize } from 'isomorphic-dompurify'
import React, { ForwardedRef, useMemo } from 'react'
import { LOCALIZABLE_TEXT_PROPS_KEYS } from '../definitions/constants'
import { HTMLElementProps, LocalizableTextProps } from '../definitions/props'
import { forwardRef } from '../modules/forward.ref'
import { ColorPicker } from '../pickers/color.picker'
import { ReactUtils } from '../utils/react.utils'

export const LocalizableText = forwardRef(<T extends object>(props: HTMLElementProps & LocalizableTextProps<T>, ref: ForwardedRef<any>) => {
  const SANITIZE_CONFIG = useMemo<SanitizeConfig>(() => ({ ADD_ATTR: ['target'], ...props.sanitizeConfig }), [props.sanitizeConfig])

  const renderLocalized = () => (
    <props.element
      {...ObjectUtils.omit(props, LOCALIZABLE_TEXT_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, ColorPicker.textByString(props.color || '', props.layer))}
      dangerouslySetInnerHTML={{ __html: sanitize(Localization.get(props.path as string, props.inject), SANITIZE_CONFIG) }}
      ref={ref}
      style={{ whiteSpace: 'pre-wrap', ...props.style }}
    />
  )

  const renderChildren = () => (
    <props.element
      {...ObjectUtils.omit(props, LOCALIZABLE_TEXT_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, ColorPicker.textByString(props.color || '', props.layer))}
      ref={ref}
      style={{ whiteSpace: 'pre-wrap', ...props.style }}
    >
      {props.path || props.children}
    </props.element>
  )

  return typeof props.path === 'string' ? renderLocalized() : renderChildren()
})
