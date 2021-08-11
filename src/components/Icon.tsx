import { ObjectUtils } from '@queelag/core'
import React from 'react'
import { ICON_PROPS_KEYS, ICON_STORE_KEYS } from '../definitions/constants'
import { IconProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
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
export function Icon(props: IconProps) {
  const store = useComponentStore(IconStore, props, ICON_STORE_KEYS, 'svg')

  return (
    <svg
      {...ObjectUtils.omit(props, ICON_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, store.color)}
      dangerouslySetInnerHTML={{ __html: store.html }}
      fill={typeof props.fill === 'boolean' ? (props.fill ? 'currentColor' : 'none') : props.fill}
      height={store.size}
      stroke={typeof props.stroke === 'boolean' ? (props.stroke ? 'currentColor' : 'none') : props.stroke}
      strokeWidth={store.thickness}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={store.viewbox}
      width={store.size}
    />
  )
}
