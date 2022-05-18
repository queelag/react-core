import { ObjectUtils, rv, WindowUtils } from '@queelag/core'
import React, { Fragment, SyntheticEvent, useEffect } from 'react'
import { IMAGE_EMPTY_BASE64, IMAGE_PROPS_KEYS, IMAGE_STORE_KEYS } from '../definitions/constants'
import { ImageProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { ImageStore } from '../stores/image.store'

/**
 * An image component which handles caching, error states, fallbacks and ratio based sizes.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Image } from '@queelag/react-core'
 *
 * function App() {
 *   return <Image src='https://website.com/linktoimage.png' />
 * }
 * ```
 *
 * @category Component
 */
export function Image(props: ImageProps) {
  const store = useComponentStore(ImageStore, props, IMAGE_STORE_KEYS, 'img')

  const onError = (event: SyntheticEvent<HTMLImageElement>) => {
    store.onError(event)
    props.onError && props.onError(event)
  }

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    store.onLoad(event)
    props.onLoad && props.onLoad(event)
  }

  const onLoadStart = (event: SyntheticEvent<HTMLImageElement>) => {
    store.onLoadStart(event)
    props.onLoadStart && props.onLoadStart(event)
  }

  useEffect(() => WindowUtils.addEventListenerAndReturnRemover('resize', () => store.dispatch()), [])
  useEffect(() => () => rv(() => store.deleteEmptyFromCache()), [])

  return (
    <Fragment>
      {store.isStatusLoaded && (
        <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} onError={onError} ref={store.ref} src={store.src} style={store.getStyle(props)} />
      )}
      {store.isFallbackVisible && <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} ref={store.ref} src={IMAGE_EMPTY_BASE64} style={store.getStyle(props)} />}
      {store.isStatusLoading && (
        <img
          {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
          onError={onError}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          ref={store.ref}
          src={store.src}
          style={{ opacity: 0, pointerEvents: 'none', position: 'absolute' }}
        />
      )}
    </Fragment>
  )
}
