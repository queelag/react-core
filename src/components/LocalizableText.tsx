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

  return (
    <props.element
      {...ObjectUtils.omit(props, LOCALIZABLE_TEXT_PROPS_KEYS)}
      children={typeof props.path !== 'string' ? props.path || props.children : undefined}
      className={ReactUtils.joinClassNames(props.className, ColorPicker.textByString(props.color || '', props.layer))}
      dangerouslySetInnerHTML={
        typeof props.path === 'string' ? { __html: sanitize(Localization.get(props.path as string, props.inject), SANITIZE_CONFIG) } : undefined
      }
      ref={ref}
      style={{ whiteSpace: 'pre-wrap', ...props.style }}
    />
  )
})
