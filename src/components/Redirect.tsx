import { RedirectProps } from '../definitions/props'

export function Redirect(props: RedirectProps) {
  props.store.redirect(props.to, props.parameters, props.clear)
  return null
}
