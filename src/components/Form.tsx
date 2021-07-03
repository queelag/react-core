import { ObjectUtils, ReactUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo, useRef } from 'react'
import { FORM_PROPS_KEYS } from '../definitions/constants'
import { FormProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { FormStore, FORM_STORE_KEYS } from '../stores/form.store'

export function Form(props: FormProps) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('form'))
  const store = useMemo(() => new FormStore(props.id, props.layer, props.onSubmit, ref, update), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, FORM_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, FORM_STORE_KEYS))

  return (
    <form
      {...ObjectUtils.omit(props, FORM_PROPS_KEYS)}
      className={ReactUtils.joinClassNames('flex flex-col space-y-4', props.className)}
      id={store.id}
      onSubmit={store.onSubmit}
      ref={ref}
    >
      {props.children}
    </form>
  )
}
