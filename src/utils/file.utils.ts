import { Base64, IDUtils } from '@queelag/core'
import { InputFileItem } from '../definitions/interfaces'

export class FileUtils {
  static async toInputFileItem(file: File): Promise<InputFileItem> {
    return {
      buffer: await file.arrayBuffer(),
      base64: Base64.encode(await file.arrayBuffer()),
      id: IDUtils.unique(),
      name: file.name,
      size: file.size,
      timestamp: file.lastModified,
      type: file.type || 'application/octet-stream'
    }
  }
}
