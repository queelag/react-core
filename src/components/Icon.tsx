import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo } from 'react'
import { ICON_PROPS_KEYS } from '../definitions/constants'
import { Orientation } from '../definitions/enums'
import { IconProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { IconStore, ICON_STORE_KEYS } from '../stores/icon.store'
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
  const update = useForceUpdate()
  const store = useMemo(() => new IconStore({ ...props, orientation: Orientation.HORIZONTAL, update }), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, ICON_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, ICON_STORE_KEYS))

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
