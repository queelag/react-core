import { Logger } from '@queelag/core'
import * as S from 'superstruct'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { ComponentStore } from './component.store'
import { Schema } from './schema'

/**
 * An abstraction for form field stores, handles value and validation.
 *
 * @category Module
 * @template T The DOM element.
 * @template U The object interface.
 */
export class ComponentFormFieldStore<T extends Element, U extends object> extends ComponentStore<T> {
  /**
   * A boolean which determines if this field is disabled or not.
   */
  disabled: boolean
  /**
   * A string useful for ARIA.
   */
  label: string
  /**
   * A keyof U, used to read the current value and set a new one.
   */
  path: keyof U
  /**
   * A boolean which determines if this field is required or not.
   */
  required: boolean
  /** @internal */
  protected _schema: S.Struct<any, any> = Schema.any
  /**
   * An object with interface U.
   */
  store: U
  /**
   * A boolean which determines if this field has been touched or not.
   */
  touched: boolean
  /**
   * A result of superstruct validation, used to determine if there's an error and what the message is.
   */
  validation: [S.StructError | undefined, any]

  constructor(name: string, props: ComponentFormFieldStoreProps<T, U>) {
    super(name, props)

    this.disabled = props.disabled || false
    this.label = props.label || ''
    this.path = props.path || ('' as any)
    this.required = props.required || false
    this.schema = props.schema || Schema.any
    this.store = props.store || ({} as any)
    this.touched = props.touched || false
    this.validation = this.schema.validate(this.value)
  }

  /**
   * Sets touched to true and validates the current value against the schema.
   */
  touch(): void {
    if (this.hasNotBeenTouched) {
      this.touched = true
      Logger.debug(this.id, 'touch', `The touched state has been set to true.`)
    }

    this.validate()
  }

  /**
   * Validates the value against the schema.
   */
  validate(): void {
    this.validation = this.schema.validate(this.value)
    Logger.debug(this.id, 'validate', `The value has been validated against the schema.`, this.validation, this.schema, this.value)

    this.update()
  }

  /**
   * Returns an error message if the validation failed otherwise an empty string is returned.
   */
  get error(): string {
    return this.validation[0] ? this.validation[0].message : ''
  }

  /**
   * A superstruct struct, used for validation.
   */
  get schema(): S.Struct<any, any> {
    return this._schema
  }

  /**
   * Anything read from store[path].
   */
  get value(): any {
    return this.store[this.path]
  }

  get hasBeenTouched(): boolean {
    return this.touched === true
  }

  get hasNotBeenTouched(): boolean {
    return this.touched === false
  }

  get hasError(): boolean {
    return this.validation[0] !== undefined
  }

  get isDisabled(): boolean {
    return this.disabled === true
  }

  get isEnabled(): boolean {
    return this.disabled === false
  }

  get isErrorVisible(): boolean {
    return this.hasBeenTouched && this.hasError
  }

  get isValid(): boolean {
    return this.validation[0] === undefined
  }

  /** @internal */
  set schema(schema: S.Struct<any, any>) {
    this._schema = schema
  }
}
