import { ForwardedRef, forwardRef as _, ReactElement } from 'react'

type ForwardRefRenderFunction<T, P = {}> = (props: P, ref: ForwardedRef<T>) => ReactElement<P>
type NullableForwardRefRenderFunction<T, P = {}> = (props: P, ref: ForwardedRef<T>) => ReactElement<P> | null

type ForwardRefExoticComponent<T, P = {}> = (props: P) => ReactElement
type NullableForwardRefExoticComponent<T, P = {}> = (props: P) => ReactElement | null

function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<T, P>
function forwardRef<T, P = {}>(render: NullableForwardRefRenderFunction<T, P>): NullableForwardRefExoticComponent<T, P>
function forwardRef(...args: any[]) {
  return _(args[0]) as any
}

export { forwardRef }
