import { ObjectUtils, ReactUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo, useRef } from 'react'
import { AVATAR_PROPS_KEYS } from '../definitions/constants'
import { AvatarProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { AvatarStore, AVATAR_STORE_KEYS } from '../stores/avatar.store'
import { ShapeUtils } from '../utils/shape.utils'
import { Image } from './Image'

export function Avatar(props: AvatarProps) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('div'))
  const store = useMemo(() => new AvatarStore(props.background, props.color, props.id, props.layer, props.ratio, ref, props.shape, props.size, update), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, AVATAR_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, AVATAR_STORE_KEYS))

  return (
    <div
      {...ObjectUtils.omit(props, AVATAR_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, store.background)}
      id={store.id}
      style={{
        ...props.style,
        ...ShapeUtils.findStyle(store.shape, store.size),
        alignItems: 'center',
        display: 'flex',
        height: store.size,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'center',
        width: store.size
      }}
    >
      {props.icon && <props.icon color={store.color} size={store.size / store.ratio} style={{ position: 'absolute' }} thickness={props.thickness} />}
      {props.source && <Image size={store.size} source={props.source} style={{ zIndex: 10 }} />}
      {props.text && (
        <b className={ReactUtils.joinClassNames(store.color)} style={{ fontSize: store.size / 3, position: 'absolute', textTransform: 'uppercase' }}>
          {props.text}
        </b>
      )}
    </div>
  )
}
