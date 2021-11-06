import { ObjectUtils } from '@queelag/core'
import React, { ForwardedRef, forwardRef } from 'react'
import { AVATAR_PROPS_KEYS, AVATAR_STORE_KEYS } from '../definitions/constants'
import { AvatarProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { AvatarStore } from '../stores/avatar.store'
import { ReactUtils } from '../utils/react.utils'
import { ShapeUtils } from '../utils/shape.utils'
import { Image } from './Image'

/**
 * A component that can display an icon, image or text.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Avatar, Shape } from '@queelag/react-core'
 *
 * function App() {
 *   return <Avatar image='https://website.com/linktoimage.png' shape={Shape.CIRCLE} />
 * }
 * ```
 *
 * @category Component
 */
export const Avatar = forwardRef((props: AvatarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const store = useComponentStore(AvatarStore, props, AVATAR_STORE_KEYS)

  return (
    <div
      {...ObjectUtils.omit(props, AVATAR_PROPS_KEYS)}
      className={ReactUtils.joinClassNames(props.className, store.background)}
      id={store.id}
      ref={ref}
      style={{
        ...props.style,
        ...ShapeUtils.findStyle(store.shape, props.size),
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
      {props.icon && (
        <props.icon
          {...props.iconProps}
          color={props.iconProps?.color || store.color}
          size={props.iconProps?.size || props.size / 2}
          style={{ ...props.iconProps?.style, position: 'absolute' }}
        />
      )}
      {props.image && <Image {...props.imageProps} size={store.size} src={props.image} style={{ ...props.imageProps?.style, zIndex: 10 }} />}
      {props.text && (
        <b
          {...props.textProps}
          className={ReactUtils.joinClassNames(props.textProps?.className, store.color)}
          style={{ fontSize: props.size / 3, textTransform: 'uppercase', ...props.textProps?.style, position: 'absolute' }}
        >
          {props.text}
        </b>
      )}
    </div>
  )
})
