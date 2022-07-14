import { boolean, refine, Struct } from 'superstruct'
import { ComponentName } from '../definitions/enums'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { CheckBoxProps } from '../definitions/with.superstruct.props'
import { StoreLogger } from '../loggers/store.logger'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for CheckBox stores, uses a custom validation schema based on required and handles value updates.
 *
 * @category Store
 */
export class CheckBoxStore<T extends object> extends ComponentFormFieldStore<HTMLDivElement, T> {
  constructor(props: CheckBoxProps<T> & ComponentFormFieldStoreProps<HTMLDivElement, T>) {
    super(ComponentName.CHECK_BOX, props)

    this.validate()
  }

  onClick = (): void => {
    if (this.isDisabled) {
      return StoreLogger.warn(this.id, 'onClick', `Execution stopped, disabled is truthy.`)
    }

    this.store[this.path] = !this.value as any
    StoreLogger.debug(this.id, 'onClick', `The value has been set to ${this.value}.`)

    this.touch()
  }

  get schema(): Struct<boolean> {
    return this.required ? refine(boolean(), 'true', (v: boolean) => v === true) : boolean()
  }

  get value(): boolean {
    return this.store[this.path] as any
  }

  set schema(schema: Struct<boolean>) {
    this._schema = schema
  }
}
