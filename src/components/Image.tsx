import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo } from 'react'
import { IMAGE_PROPS_KEYS } from '../definitions/constants'
import { ImageProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { ImageStore, IMAGE_STORE_KEYS } from '../stores/image.store'
import { ShapeUtils } from '../utils/shape.utils'

export function Image(props: ImageProps) {
  const update = useForceUpdate()
  const store = useMemo(() => new ImageStore(props.id, props.shape, props.source, update), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, IMAGE_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, IMAGE_STORE_KEYS))

  return (
    <>
      {store.hasNoError && (
        <img
          {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
          id={store.id}
          onError={store.onError}
          src={store.source}
          style={{ ...props.style, ...(props.size && { ...ShapeUtils.findStyle(store.shape, props.size), height: props.size, width: props.size }) }}
        />
      )}
      {store.hasError && (
        <>
          {typeof props.fallback === 'string' && (
            <img
              {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
              id={store.id}
              src={props.fallback}
              style={{ ...props.style, ...(props.size && { ...ShapeUtils.findStyle(store.shape, props.size), height: props.size, width: props.size }) }}
            />
          )}
          {typeof props.fallback === 'function' && (
            <props.fallback
              {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
              id={store.id}
              style={{ ...props.style, ...(props.size && { ...ShapeUtils.findStyle(store.shape, props.size), height: props.size, width: props.size }) }}
            />
          )}
          {typeof props.fallback === 'undefined' && (
            <div
              {...ObjectUtils.omit(props, IMAGE_PROPS_KEYS)}
              id={store.id}
              style={{ ...props.style, ...(props.size && { ...ShapeUtils.findStyle(store.shape, props.size), height: props.size, width: props.size }) }}
            />
          )}
        </>
      )}
    </>
  )
}
