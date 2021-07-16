import { ObjectUtils } from '@queelag/core'
import React from 'react'
import { BACKDROP_PROPS_KEYS } from '../definitions/constants'
import { BackdropProps } from '../definitions/props'

/**
 * @category Component
 */
export function Backdrop(props: BackdropProps) {
  return (
    <div
      {...ObjectUtils.omit(props, BACKDROP_PROPS_KEYS)}
      style={{ background: 'black', height: '100%', opacity: props.opacity || 0.5, position: 'absolute', width: '100%' }}
    />
  )
}
