import { Size } from '../definitions/enums'
import { ComponentSizeProps } from '../definitions/props'
import { ComponentStore } from './component.store'

/**
 * @category Module
 */
export class ComponentSizeStore<T extends Element> extends ComponentStore<T> {
  size: Size

  constructor(name: string, props: ComponentSizeProps<T>) {
    super(name, props)

    this.size = props.size || Size.MEDIUM
  }

  get isSizeLarge(): boolean {
    return this.size === Size.LARGE
  }

  get isSizeMedium(): boolean {
    return this.size == Size.MEDIUM
  }

  get isSizeSmall(): boolean {
    return this.size === Size.SMALL
  }
}
