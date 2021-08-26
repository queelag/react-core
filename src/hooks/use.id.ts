import { Environment, ID, IDUtils } from '@queelag/core'
import { useEffect, useState } from 'react'

/**
 * Generates a prefixed ID.
 *
 * @category Hook
 */
export function useID(prefix: string, customID: ID = '', initialID: ID = Environment.isWindowDefined ? IDUtils.prefixed(prefix) : ''): ID {
  const [id, setID] = useState<ID>(customID || initialID)

  useEffect(() => {
    switch (true) {
      case customID.length > 0:
        setID(customID)
        break
      case id.length <= 0:
        setID(IDUtils.prefixed(prefix))
        break
    }
  }, [customID, prefix])

  return id
}
