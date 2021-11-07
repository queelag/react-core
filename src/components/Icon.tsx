import { ObjectUtils } from '@queelag/core'
import React, { ForwardedRef } from 'react'
import { ICON_PROPS_KEYS, ICON_STORE_KEYS } from '../definitions/constants'
import { IconProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { forwardRef } from '../modules/forward.ref'
import { IconStore } from '../stores/icon.store'
import { ReactUtils } from '../utils/react.utils'

/**
 * A svg component that safely renders any raw svg into it, allowing every possible customization.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Icon } from '@queelag/react-core'
 *
 * function IconPlus() {
 *   return <Icon svg='<svg>anything</svg>' stroke />
 * }
 * ```
 *
 * @category Component
 */
export const Icon = forwardRef((props: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
  const store = useComponentStore(IconStore, props, ICON_STORE_KEYS, 'svg')

  return (
    <svg
      {...ObjectUtils.omit(props, ICON_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, store.color)}
      dangerouslySetInnerHTML={{ __html: store.html }}
      fill={typeof props.fill === 'boolean' ? (props.fill ? 'currentColor' : 'none') : props.fill}
      height={store.size}
      ref={ref}
      stroke={typeof props.stroke === 'boolean' ? (props.stroke ? 'currentColor' : 'none') : props.stroke}
      strokeWidth={store.thickness}
      style={{
        height: store.size,
        maxHeight: store.size,
        maxWidth: store.size,
        minHeight: store.size,
        minWidth: store.size,
        width: store.size,
        ...props.style
      }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={store.viewbox}
      width={store.size}
    />
  )
})
