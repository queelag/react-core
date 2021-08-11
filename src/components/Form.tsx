import { ObjectUtils } from '@queelag/core'
import React from 'react'
import { FORM_PROPS_KEYS, FORM_STORE_KEYS } from '../definitions/constants'
import { FormProps } from '../definitions/props'
import { useComponentStore } from '../hooks/use.component.store'
import { FormStore } from '../stores/form.store'

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
  const store = useComponentStore(FormStore, props, FORM_STORE_KEYS, 'form')

  return (
    <form {...ObjectUtils.omit(props, FORM_PROPS_KEYS)} id={store.id} onSubmit={store.onSubmit} ref={store.ref}>
      {props.children}
    </form>
  )
}
