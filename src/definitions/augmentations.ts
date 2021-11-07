import type React from 'react'

declare module 'react' {
  function forwardRef<T, U extends React.ReactElement<P>, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement
  ): (props: P & React.RefAttributes<T>) => U
}
