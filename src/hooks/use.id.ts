import { ID, IDUtils } from '@queelag/core'
import { useMemo } from 'react'

/**
 * Generates a prefixed ID.
 *
 * @category Hook
 */
export function useID(prefix: string, id: string = IDUtils.prefixed(prefix)): ID {
  return useMemo(() => id, [])
}
