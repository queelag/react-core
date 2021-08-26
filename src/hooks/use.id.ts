import { ID, IDUtils } from '@queelag/core'
import { useEffect, useState } from 'react'

/**
 * Generates a prefixed ID.
 *
 * @category Hook
 */
export function useID(prefix: string, customID: ID = ''): ID {
  const [id, setID] = useState<ID>(customID)

  useEffect(() => {
    switch (true) {
      case customID.length > 0:
        setID(customID)
        break
      default:
        setID(IDUtils.prefixed(prefix))
        break
    }
  }, [customID, prefix])

  return id
}
