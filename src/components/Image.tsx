import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { Fragment, SyntheticEvent, useEffect, useMemo, useRef } from 'react'
import { IMAGE_EMPTY_BASE64, IMAGE_PROPS_KEYS } from '../definitions/constants'
import { ImageProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { ImageStore, IMAGE_STORE_KEYS } from '../stores/image.store'
import { WindowUtils } from '../utils/window.utils'

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
 *   return <Image source='https://website.com/linktoimage.png' />
 * }
 * ```
 *
 * @category Component
 */
export function Image(props: ImageProps) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('img'))
  const store = useMemo(() => new ImageStore({ ...props, ref, update }), [])

  const onError = (event: SyntheticEvent<HTMLImageElement>) => {
    store.onError(event)
    props.onError && props.onError(event)
  }

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    store.onLoad(event)
    props.onLoad && props.onLoad(event)
  }

  useEffect(() => {
    StoreUtils.updateKeys(store, props, IMAGE_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, IMAGE_STORE_KEYS))

  useEffect(() => WindowUtils.addEventListenerAndReturnRemover('resize', () => store.update()), [])

  return (
    <Fragment>
      {store.isStatusLoaded && (
        <img
          {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
          id={store.id}
          onError={onError}
          onLoad={onLoad}
          ref={ref}
          src={props.source}
          style={store.getStyle(props)}
        />
      )}
      {store.isFallbackVisible && <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} ref={ref} src={IMAGE_EMPTY_BASE64} style={store.getStyle(props)} />}
      {store.isStatusLoading && (
        <img onError={onError} onLoad={onLoad} src={props.source} style={{ opacity: 0, pointerEvents: 'none', position: 'absolute' }} />
      )}
    </Fragment>
  )
}
