import 'react'

declare module 'react' {
  function forwardRef<T, U extends ReactElement<P>, P = {}>(render: (props: P, ref: Ref<T>) => ReactElement): (props: P & RefAttributes<T>) => U
}
