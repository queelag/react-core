import { Logger } from '@queelag/core'
import * as S from 'superstruct'
import { ComponentName } from '../definitions/enums'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { CheckBoxProps } from '../definitions/with.superstruct.props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for CheckBox stores, uses a custom validation schema based on required and handles value updates.
 *
 * @category Store
 */
export class CheckBoxStore<U extends object> extends ComponentFormFieldStore<HTMLDivElement, U> {
  constructor(props: CheckBoxProps<U> & ComponentFormFieldStoreProps<HTMLDivElement, U>) {
    super(ComponentName.CHECKBOX, props)

    this.validate()
  }

  onClick = (): void => {
    if (this.isDisabled) {
      return Logger.warn(this.id, 'onClick', `Execution stopped, disabled is truthy.`)
    }

    this.store[this.path] = !this.value as any
    Logger.debug(this.id, 'onClick', `The value has been set to ${this.value}.`)

    this.touch()
  }

  get schema(): S.Struct<boolean> {
    return this.required ? S.refine(S.boolean(), 'true', (v: boolean) => v === true) : S.boolean()
  }

  get value(): boolean {
    return this.store[this.path] as any
  }

  set schema(schema: S.Struct<boolean>) {
    this._schema = schema
  }
}
