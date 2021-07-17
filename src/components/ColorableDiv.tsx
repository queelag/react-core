import { ObjectUtils, ReactUtils } from '@queelag/core'
import React, { ForwardedRef, forwardRef } from 'react'
import { COLOR_DIV_PROPS_KEYS } from '../definitions/constants'
import { ColorableDivProps } from '../definitions/props'
import { ColorPicker } from '../pickers/color.picker'

/**
 * A div component that uses the {@link ColorPicker} under the hood.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Color, ColorableDiv } from '@queelag/react-core'
 *
 * function App() {
 *   return <ColorableDiv background={Color.RED} border={Color.MONO} divide={Color.BLUE} text={Color.GREEN} />
 * }
 * ```
 *
 * @category Component
 */
export const ColorableDiv = forwardRef((props: ColorableDivProps, ref: ForwardedRef<HTMLDivElement>) => {
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
      ref={ref}
    >
      {props.children}
    </div>
  )
})
