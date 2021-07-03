import { RedirectProps } from '../definitions/props'

function Redirect(props: RedirectProps) {
  props.store.goto(props.to, true)
  return null
}

export default Redirect
