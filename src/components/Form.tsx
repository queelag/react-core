import { ObjectUtils, ReactUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo, useRef } from 'react'
import { FormProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { FormStore } from '../stores/form.store'

export function Form(props: FormProps) {
  const ref = useRef(document.createElement('form'))
  const update = useForceUpdate()
  const store = useMemo(() => new FormStore(props.id, props.layer, props.onSubmit, ref, update), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, ['id', 'layer', 'onSubmit'], update)
  }, [props.id, props.layer, props.onSubmit])

  return (
    <form
      {...ObjectUtils.omit(props, 'layer', 'onSubmit')}
      className={ReactUtils.joinClassNames('flex flex-col space-y-4', props.className)}
      id={store.id}
      onSubmit={store.onSubmit}
      ref={ref}
    >
      {props.children}
    </form>
  )
}
