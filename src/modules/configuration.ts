import { ConfigurationData } from '../definitions/interfaces'
import { Dummy } from './dummy'

export class Configuration {
  static data: ConfigurationData = Dummy.configurationData

  static isComponentStoreGeneratingIDOnConstruction(): boolean {
    return this.data.ComponentStore.generateIDOnConstruction === true
  }
}
