import * as S from 'superstruct'
import { ComponentFormFieldProps } from '../definitions/with.superstruct.props'
import { ComponentLayerStore } from './component.layer.store'
import { Dummy } from './dummy'

/**
 * An abstraction for form field stores, handles value and validation.
 *
 * @category Module
 * @template T The DOM element.
 * @template U The object interface.
 */
export class ComponentFormFieldStore<T extends Element, U extends object> extends ComponentLayerStore<T> {
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
  protected _schema: S.Struct<any, any> = Dummy.schema
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

  constructor(name: string, props: ComponentFormFieldProps<T, U>) {
    super(name, props)

    this.disabled = props.disabled || false
    this.label = props.label || ''
    this.path = props.path
    this.required = props.required || false
    this.schema = props.schema || Dummy.schema
    this.store = props.store
    this.touched = props.touched || false
    this.validation = this.schema.validate(this.value)
  }

  /**
   * Sets touched to true and validates the current value against the schema.
   */
  touch(): void {
    this.touched = true
    this.validation = this.schema.validate(this.value)

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
   * Anything read from store[path]
   */
  get value(): any {
    return this.store[this.path]
  }

  /**
   * Checks if this field has been touched.
   */
  get hasBeenTouched(): boolean {
    return this.touched === true
  }

  /**
   * Checks if the validation failed.
   */
  get hasError(): boolean {
    return this.validation[0] !== undefined
  }

  /**
   * Checks if this field is disabled.
   */
  get isDisabled(): boolean {
    return this.disabled === true
  }

  /**
   * Checks if this field is enabled.
   */
  get isEnabled(): boolean {
    return this.disabled === false
  }

  /**
   * Returns true if this field has been touched and the validation failed.
   */
  get isErrorVisible(): boolean {
    return this.hasBeenTouched && this.hasError
  }

  /**
   * Checks if the validation succeded.
   */
  get isValid(): boolean {
    return this.validation[0] === undefined
  }

  /** @internal */
  set schema(schema: S.Struct<any, any>) {
    this._schema = schema
  }
}
