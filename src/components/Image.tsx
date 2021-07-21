import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { Fragment, SyntheticEvent, useEffect, useMemo, useRef } from 'react'
import { IMAGE_PROPS_KEYS } from '../definitions/constants'
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

  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    store.onError(e)
    props.onError && props.onError(e)
  }

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    store.update()
    props.onLoad && props.onLoad(e)
  }

  useEffect(() => {
    StoreUtils.updateKeys(store, props, IMAGE_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, IMAGE_STORE_KEYS))

  useEffect(() => WindowUtils.addEventListenerAndReturnRemover('resize', () => store.update()), [])

  return (
    <>
      {store.hasNoError && (
        <Fragment>
          {store.source.length > 0 && (
            <img
              {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
              id={store.id}
              onError={onError}
              onLoad={onLoad}
              ref={ref}
              src={store.source}
              style={store.getStyle(props)}
            />
          )}
          {store.source.length <= 0 && <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} ref={ref} style={store.getStyle(props)} />}
        </Fragment>
      )}
      {store.hasError && (
        <Fragment>
          {typeof props.fallback === 'string' && (
            <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} src={props.fallback} style={store.getStyle(props)} />
          )}
          {typeof props.fallback === 'function' && (
            <props.fallback {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} style={store.getStyle(props)} />
          )}
          {typeof props.fallback === 'undefined' && <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} style={store.getStyle(props)} />}
        </Fragment>
      )}
    </>
  )
}
