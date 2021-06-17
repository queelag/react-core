import { ID, IDUtils } from '@queelag/core'
import { useMemo } from 'react'

export function useID(prefix: string, id: string = IDUtils.prefixed(prefix)): ID {
  return useMemo(() => id, [])
}
