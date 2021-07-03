import { ObjectUtils } from '@queelag/core'
import { IReactionDisposer, reaction } from 'mobx'
import React, { useEffect, useRef } from 'react'
import { ROUTER_PROPS_KEYS } from '../definitions/constants'
import { RouterProps } from '../definitions/props'
import { useForceUpdate } from '../hooks/use.force.update'

function Router(props: RouterProps) {
  const update = useForceUpdate()
  const ref = useRef(document.createElement('div'))

  useEffect(() => {
    let disposer: IReactionDisposer

    props.store.ref = ref
    props.store.update = update

    disposer = reaction(
      () => props.store.last.name,
      () => props.store.onHistoryChange()
    )

    return () => disposer()
  }, [])

  return (
    <div {...ObjectUtils.omit(props, ROUTER_PROPS_KEYS)} id={props.store.id} ref={ref}>
      <props.store.last.parent>
        <props.store.last.component />
      </props.store.last.parent>
    </div>
  )
}

export default Router
