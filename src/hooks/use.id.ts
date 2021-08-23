import { ID, IDUtils } from '@queelag/core'
import { useEffect, useState } from 'react'

/**
 * Generates a prefixed ID.
 *
 * @category Hook
 */
export function useID(prefix: string, customID: string = ''): ID {
  const [id, setID] = useState<ID>(customID)

  useEffect(() => {
    setID(IDUtils.prefixed(prefix))
  }, [customID, prefix])

  return id
}
