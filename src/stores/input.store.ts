import { Logger, NumberUtils, TextCodec } from '@queelag/core'
import { ChangeEvent } from 'react'
import { ComponentName, InputTouchTrigger, InputType } from '../definitions/enums'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { InputProps } from '../definitions/with.superstruct.props'
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
   * An {@link InputTouchTrigger} which determines when this input is marked as touched.
   */
  touchTrigger: InputTouchTrigger
  /**
   * An {@link InputType} which determines how the internal logic behaves.
   */
  type: InputType

  constructor(props: InputProps<T> & ComponentFormFieldStoreProps<HTMLInputElement, T>) {
    super(ComponentName.INPUT, props)

    this.focused = false
    this.obscured = true
    this.touchTrigger = props.touchTrigger || InputTouchTrigger.BLUR
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
        this.store[this.path] = TextCodec.encode(event.target.value) as any
        Logger.debug(this.id, 'onChange', this.type, `The value has been set.`, this.value)

        break
      case InputType.DATE:
        this.store[this.path] = 0 as any
        Logger.debug(this.id, 'onChange', this.type, `The value has been set to ${this.value}.`)

        break
      case InputType.NUMBER:
        this.store[this.path] = (event.target.value.length > 0 ? NumberUtils.parseFloat(event.target.value) : '') as any
        Logger.debug(this.id, 'onChange', this.type, `The value has been set to ${this.value}.`)

        break
      case InputType.EMAIL:
      case InputType.PASSWORD:
      case InputType.TEL:
      case InputType.TEXT:
      case InputType.URL:
        this.store[this.path] = event.target.value as any
        Logger.debug(this.id, 'onChange', this.type, `The value has been set to ${this.value}.`)

        break
    }

    this.isTouchTriggerChange && this.touch()
    this.validate()
  }

  /**
   * Marks this field as blurred.
   */
  onBlur = (): void => {
    this.focused = false
    Logger.debug(this.id, 'onBlur', 'The focused state has been set to false.')

    this.isTouchTriggerBlur && this.touch()
  }

  /**
   * Marks this field as focused.
   */
  onFocus = (): void => {
    this.focused = true
    Logger.debug(this.id, 'onFocus', `The focused state has been set to true.`)

    this.update()
  }

  /**
   * Enables obscuration if disabled and disables it if enabled.
   */
  onClickToggleObscuration = (): void => {
    this.obscured = !this.obscured
    Logger.debug(this.id, 'onClickToggleObscuration', `The obscuration has been set to ${this.obscured}.`)

    if (this.isTypeBuffer) {
      this.element.type = this.obscured ? 'password' : 'text'
      Logger.debug(this.id, 'onClickToggleObscuration', `The element type has been set to ${this.element.type}.`)
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

  get isObscured(): boolean {
    return this.obscured === true
  }

  get isNotObscured(): boolean {
    return this.obscured === false
  }

  get isTouchTriggerBlur(): boolean {
    return this.touchTrigger === InputTouchTrigger.BLUR
  }

  get isTouchTriggerChange(): boolean {
    return this.touchTrigger === InputTouchTrigger.CHANGE
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
