import { NumberUtils } from '@queelag/core'
import { ChangeEvent } from 'react'
import { ComponentName, InputType } from '../definitions/enums'
import { ComponentFormFieldProps, InputProps } from '../definitions/with.superstruct.props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for Input stores, handles focus, obscuration and types.
 *
 * @category Store
 */
export class InputStore<T extends object> extends ComponentFormFieldStore<HTMLInputElement, T> {
  /**
   * A boolean which determines if this input is focused or not.
   */
  focused: boolean
  /**
   * A boolean which determines if this input value is obscured or not.
   */
  obscured: boolean
  /**
   * An {@link InputType} which determines how the internal logic behaves.
   */
  type: InputType

  constructor(props: InputProps<T> & ComponentFormFieldProps<HTMLInputElement, T>) {
    super(ComponentName.INPUT, props)

    this.focused = false
    this.obscured = true
    this.type = props.type || InputType.TEXT
  }

  /** @internal */
  detachInputFromReact(autoFocus: boolean = false): void {
    let input: HTMLInputElement

    input = document.createElement('input')
    input.autocapitalize = this.element.autocapitalize
    input.autocomplete = this.element.autocomplete
    input.className = this.element.className
    input.placeholder = this.element.placeholder
    input.type = this.lowercaseType

    input.addEventListener('blur', this.onBlur)
    input.addEventListener('change', this.onChange as any)
    input.addEventListener('focus', this.onFocus)

    this.element.replaceWith(input)

    autoFocus && input.focus()
  }

  /**
   * Updates store[path] based on the type.
   */
  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    switch (this.type) {
      case InputType.BUFFER:
        this.store[this.path] = new TextEncoder().encode(event.target.value) as any
        break
      case InputType.DATE:
        this.store[this.path] = 0 as any
        break
      case InputType.NUMBER:
        this.store[this.path] = (event.target.value.length > 0 ? NumberUtils.parseFloat(event.target.value) : '') as any
        break
      case InputType.EMAIL:
      case InputType.PASSWORD:
      case InputType.TEL:
      case InputType.TEXT:
      case InputType.URL:
        this.store[this.path] = event.target.value as any
        break
    }

    this.touched = true
    this.validation = this.schema.validate(this.value)

    this.update()
  }

  /**
   * Marks this field as focused.
   */
  onFocus = (): void => {
    this.focused = true
    this.update()
  }

  /**
   * Marks this field as blurred.
   */
  onBlur = (): void => {
    this.focused = false
    this.update()
  }

  /**
   * Enables obscuration if disabled and disables it if enabled.
   */
  onClickToggleObscuration = (): void => {
    this.obscured = !this.obscured

    if (this.isTypeBuffer) {
      this.element.type = this.obscured ? 'password' : 'text'
    }

    this.update()
  }

  /**
   * Makes the type readable by the DOM.
   */
  get lowercaseType(): string {
    switch (this.type) {
      case InputType.DATE:
        return 'date'
      case InputType.EMAIL:
        return 'email'
      case InputType.NUMBER:
        return 'number'
      case InputType.BUFFER:
      case InputType.PASSWORD:
        return this.obscured ? 'password' : 'text'
      case InputType.TEL:
        return 'tel'
      case InputType.TEXT:
        return 'text'
      case InputType.URL:
        return 'url'
    }
  }

  /**
   * A value read from store[path].
   */
  get value(): number | string | undefined {
    switch (this.type) {
      case InputType.BUFFER:
        return undefined
      case InputType.DATE:
      case InputType.NUMBER:
        return (this.store[this.path] as any) || 0
      case InputType.EMAIL:
      case InputType.PASSWORD:
      case InputType.TEL:
      case InputType.TEXT:
      case InputType.URL:
        return (this.store[this.path] as any) || ''
    }
  }

  get isBlurred(): boolean {
    return this.focused === false
  }

  get isFocused(): boolean {
    return this.focused === true
  }

  get isTypeBuffer(): boolean {
    return this.type === InputType.BUFFER
  }

  get isTypeNumber(): boolean {
    return this.type === InputType.NUMBER
  }

  get isTypePassword(): boolean {
    return this.type === InputType.PASSWORD
  }

  get isTypeBufferOrPassword(): boolean {
    return this.isTypeBuffer || this.isTypePassword
  }
}

/** @category Constant */
export const INPUT_STORE_KEYS: (keyof InputProps<any> & keyof InputStore<any>)[] = [
  'id',
  'label',
  'layer',
  'path',
  'required',
  'schema',
  'store',
  'touched',
  'type'
]
