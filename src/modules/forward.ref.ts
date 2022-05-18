import { ForwardedRef, forwardRef as _, ReactElement } from 'react'

type ForwardRefRenderFunction<T, P = {}> = (props: P, ref: ForwardedRef<T>) => ReactElement<P>
type NullableForwardRefRenderFunction<T, P = {}> = (props: P, ref: ForwardedRef<T>) => ReactElement<P> | null

type ForwardRefExoticComponent<P = {}> = (props: P) => ReactElement
type NullableForwardRefExoticComponent<P = {}> = (props: P) => ReactElement<P> | null

function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<P>
function forwardRef<T, P = {}>(render: NullableForwardRefRenderFunction<T, P>): NullableForwardRefExoticComponent<P>
function forwardRef(...args: any[]) {
  return _(args[0]) as any
}

export { forwardRef }
