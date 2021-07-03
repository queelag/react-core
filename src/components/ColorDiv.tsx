import { ObjectUtils, ReactUtils } from '@queelag/core'
import React from 'react'
import { COLOR_DIV_PROPS_KEYS } from '../definitions/constants'
import { ColorDivProps } from '../definitions/props'
import { ColorPicker } from '../pickers/color.picker'

export function ColorDiv(props: ColorDivProps) {
  return (
    <div
      {...ObjectUtils.omit(props, COLOR_DIV_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(
        props.background && ColorPicker.background(props.background, props.layer),
        props.border && ColorPicker.border(props.border, props.layer),
        props.divide && ColorPicker.divide(props.divide, props.layer),
        props.text && ColorPicker.text(props.text, props.layer),
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
