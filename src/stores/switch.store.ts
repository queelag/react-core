import { ComponentName } from '../definitions/enums'
import { ComponentFormFieldProps, SwitchProps } from '../definitions/props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for Switch stores, handles value updates.
 *
 * @category Store
 */
export class SwitchStore<T extends object> extends ComponentFormFieldStore<HTMLDivElement, T> {
  constructor(props: SwitchProps<T> & ComponentFormFieldProps<HTMLDivElement, T>) {
    super(ComponentName.SWITCH, props)
  }

  /** @internal */
  onChange = (value: boolean): void => {
    if (this.isEnabled) {
      this.store[this.path] = value as any
    }
  }

  /**
   * Sets the value to true if false and to false if true.
   */
  onClick = (): void => {
    this.onChange(!this.value)
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

/** @category Constant */
export const SWITCH_STORE_KEYS: (keyof SwitchProps<any> & keyof SwitchStore<any>)[] = ['disabled', 'id', 'label', 'layer', 'path', 'store']
