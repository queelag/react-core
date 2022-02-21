import { ComponentName } from '../definitions/enums'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { SwitchProps } from '../definitions/with.superstruct.props'
import { StoreLogger } from '../loggers/store.logger'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for Switch stores, handles value updates.
 *
 * @category Store
 */
export class SwitchStore<T extends object> extends ComponentFormFieldStore<HTMLDivElement, T> {
  constructor(props: SwitchProps<T> & ComponentFormFieldStoreProps<HTMLDivElement, T>) {
    super(ComponentName.SWITCH, props)
  }

  /**
   * Sets the value to true if false and to false if true.
   */
  onClick = (): void => {
    if (this.isDisabled) {
      return StoreLogger.warn(this.id, 'onChange', `Execution stopped, disabled is truthy.`)
    }

    this.store[this.path] = !this.value as any
    StoreLogger.debug(this.id, 'onChange', `The value has been set to ${this.value}.`)

    this.touch()
  }

  /**
   * A value read from store[path].
   */
  get value(): boolean {
    return (this.store[this.path] as any) || false
  }

  /**
   * Checks if the value is false.
   */
  get isOff(): boolean {
    return this.value === false
  }

  /**
   * Checks if the value is true.
   */
  get isOn(): boolean {
    return this.value === true
  }
}
