import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import { IMAGE_PROPS_KEYS } from '../definitions/constants'
import { ImageProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { ImageStore, IMAGE_STORE_KEYS } from '../stores/image.store'
import { ShapeUtils } from '../utils/shape.utils'

/**
 * @category Component
 */
export function Image(props: ImageProps) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('img'))
  const store = useMemo(() => new ImageStore(props.id, ref, props.shape, props.source, update), [])

  const style = {
    ...props.style,
    ...ShapeUtils.findStyle(store.shape, props.size || 0),
    height: props.height || props.size || store.height || undefined,
    width: props.width || props.size || store.width || undefined
  }

  const onLoad = () => {
    if (props.heightRatio) {
      store.setHeight(store.elementWidth * props.heightRatio)
    } else if (props.widthRatio) {
      store.setWidth(store.elementHeight * props.widthRatio)
    }
  }

  useEffect(() => {
    StoreUtils.updateKeys(store, props, IMAGE_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, IMAGE_STORE_KEYS))

  return (
    <>
      {store.hasNoError && (
        <Fragment>
          {store.source.length > 0 && (
            <img
              {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
              id={store.id}
              onError={store.onError}
              onLoad={onLoad}
              ref={ref}
              src={store.source}
              style={style}
            />
          )}
          {store.source.length <= 0 && <div {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} ref={ref} style={style} />}
        </Fragment>
      )}
      {store.hasError && (
        <>
          {typeof props.fallback === 'string' && <img {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} src={props.fallback} style={style} />}
          {typeof props.fallback === 'function' && <props.fallback {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} style={style} />}
          {typeof props.fallback === 'undefined' && <div {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)} id={store.id} style={style} />}
        </>
      )}
    </>
  )
}
