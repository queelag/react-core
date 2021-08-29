import { ID, IDUtils } from '@queelag/core'
import { useEffect, useState } from 'react'

/**
 * Generates a prefixed ID.
 *
 * @category Hook
 */
export function useID(prefix: string, customID: ID = '', initialID: ID = ''): ID {
  const [id, setID] = useState<ID>(customID || initialID)

  useEffect(() => {
    switch (true) {
      case customID.length > 0:
        setID(customID)
        break
      case initialID.length > 0:
        setID(initialID)
        break
      default:
        setID(IDUtils.prefixed(prefix))
        break
    }
  }, [customID, initialID, prefix])

  return id
}
