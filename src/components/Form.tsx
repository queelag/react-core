import { ObjectUtils, StoreUtils } from '@queelag/core'
import React, { useEffect, useMemo, useRef } from 'react'
import { FORM_PROPS_KEYS } from '../definitions/constants'
import { FormProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'
import { FormStore, FORM_STORE_KEYS } from '../stores/form.store'

/**
 * A component that has custom submit interactions with form field components.
 *
 * Usage:
 *
 * ```typescript
 * import React from 'react'
 * import { Form } from '@queelag/react-core'
 *
 * function App() {
 *   const onSubmit = () => console.log('John')
 *
 *   return (
 *     <Form>
 *       // Any form field goes here
 *     </Form>
 *   )
 * }
 * ```
 *
 * @category Component
 */
export function Form(props: FormProps) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('form'))
  const store = useMemo(() => new FormStore({ ...props, ref, update }), [])

  useEffect(() => {
    StoreUtils.updateKeys(store, props, FORM_STORE_KEYS, update)
  }, ObjectUtils.pickToArray(props, FORM_STORE_KEYS))

  return (
    <form {...ObjectUtils.omit(props, FORM_PROPS_KEYS)} id={store.id} onSubmit={store.onSubmit} ref={ref}>
      {props.children}
    </form>
  )
}
