import { ObjectUtils, ReactUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo } from 'react'
import { ICON_PROPS_KEYS } from '../definitions/constants'
import { IconProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { IconStore, ICON_STORE_KEYS } from '../stores/icon.store'

export function Icon(props: IconProps) {
  const update = useForceUpdate()
  const store = useMemo(() => new IconStore(props.color, props.id, props.layer, props.size, props.svg, props.thickness, update), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, ICON_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, ICON_STORE_KEYS))

  return (
    <svg
      {...ObjectUtils.omit(props, ICON_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, store.color)}
      dangerouslySetInnerHTML={{ __html: store.html }}
      fill={props.fill ? 'currentColor' : 'none'}
      height={store.size}
      stroke={props.stroke ? 'currentColor' : 'none'}
      strokeWidth={store.thickness}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={store.viewbox}
      width={store.size}
    />
  )
}
