import { NumberUtils, TextCodec } from '@queelag/core'
import { ChangeEvent, HTMLInputTypeAttribute, KeyboardEvent } from 'react'
import { ComponentLifeCycle, ComponentName, InputMode, InputTouchTrigger, InputType } from '../definitions/enums'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { InputProps } from '../definitions/with.superstruct.props'
import { StoreLogger } from '../loggers/store.logger'
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
   * An {@link InputMode} which determines how the internal logic behaves.
   */
  mode: InputMode
  /**
   * A boolean which determines if this input value is obscured or not.
   */
  obscured: boolean
  /**
   * A string which contains the potential value to be pushed when the mode is set to MULTIPLE.
   */
  query: string
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
    this.mode = props.mode || InputMode.SINGLE
    this.obscured = true
    this.query = ''
    this.touchTrigger = props.touchTrigger || InputTouchTrigger.BLUR
    this.type = props.type || InputType.TEXT

    this.mount = () => {
      if (this.isTypeBuffer) {
        this.detachInputFromReact(props)
      }

      this.life = ComponentLifeCycle.MOUNTED
    }
  }

  /** @internal */
  detachInputFromReact(props: InputProps<T> & ComponentFormFieldStoreProps<HTMLInputElement, T>): void {
    let input: HTMLInputElement

    input = document.createElement('input')
    input.autocapitalize = this.element.autocapitalize
    input.autocomplete = this.element.autocomplete
    input.className = this.element.className
    input.placeholder = this.element.placeholder
    input.type = this.lowercaseType

    input.addEventListener('blur', this.onBlur)
    input.addEventListener('focus', this.onFocus)
    input.addEventListener('input', this.onChange as any)

    this.element.replaceWith(input)
    this.ref.current = input

    props.autoFocus && input.focus()
  }

  /**
   * Updates store[path] based on the type.
   */
  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    switch (this.type) {
      case InputType.BUFFER:
        this.store[this.path] = TextCodec.encode(event.target.value) as any
        StoreLogger.debug(this.id, 'onChange', this.type, `The value has been set.`, this.store[this.path])

        break
      case InputType.DATE:
      case InputType.DATE_TIME:
      case InputType.EMAIL:
      case InputType.MONTH:
      case InputType.PASSWORD:
      case InputType.SEARCH:
      case InputType.TEL:
      case InputType.TIME:
      case InputType.URL:
      case InputType.WEEK:
        this.store[this.path] = event.target.value as any
        StoreLogger.debug(this.id, 'onChange', this.type, this.mode, `The value has been set to ${this.value}.`)

        break
      case InputType.NUMBER:
        this.store[this.path] = (event.target.value.length > 0 ? NumberUtils.parseFloat(event.target.value) : '') as any
        StoreLogger.debug(this.id, 'onChange', this.type, `The value has been set to ${this.value}.`)

        break
      case InputType.TEXT:
        switch (this.mode) {
          case InputMode.MULTIPLE:
            this.query = event.target.value
            StoreLogger.debug(this.id, 'onChange', this.type, this.mode, `The query has been set to ${this.query}.`)

            this.dispatch()

            break
          case InputMode.SINGLE:
            this.store[this.path] = event.target.value as any
            StoreLogger.debug(this.id, 'onChange', this.type, this.mode, `The value has been set to ${this.value}.`)

            break
        }

        break
    }

    switch (this.touchTrigger) {
      case InputTouchTrigger.BLUR:
      case InputTouchTrigger.NONE:
        this.validate()
        break
      case InputTouchTrigger.CHANGE:
        this.touch()
        break
    }
  }

  /**
   * Pushes query to store[path] if the type is TEXT and the mode is MULTIPLE.
   */
  onKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    switch (event.key) {
      case 'Enter':
        switch (this.type) {
          case InputType.TEXT:
            switch (this.mode) {
              case InputMode.MULTIPLE:
                if (this.query.length <= 0) {
                  StoreLogger.warn(this.id, 'onKeyUp', `The query is empty.`)
                  return
                }

                this.store[this.path] = [...this.valueAsStringArray, this.query] as any
                StoreLogger.debug(this.id, 'onKeyUp', `The query has been pushed to the value.`, this.value)

                this.query = ''
                StoreLogger.debug(this.id, 'onKeyUp', `The query has been reset.`)

                this.dispatch()
                this.touch()

                break
            }
            break
        }
        break
    }
  }

  /**
   * Removes an item from store[path] if the mode is MULTIPLE.
   */
  onClickRemoveItem = (item: string): void => {
    switch (this.type) {
      case InputType.TEXT:
        switch (this.mode) {
          case InputMode.MULTIPLE:
            this.store[this.path] = this.valueAsStringArray.filter((v: string) => v !== item) as any
            StoreLogger.debug(this.id, 'onClickRemoveItem', `The item ${item} has been removed from the value.`, this.value)

            this.touch()

            break
          case InputMode.SINGLE:
            StoreLogger.warn(this.id, 'onClickRemoveItem', `The remove function does not work with the ${this.mode} mode.`)
            break
        }

        break
      default:
        StoreLogger.warn(this.id, 'onClickRemoveItem', `The remove function does not work with the ${this.type} type.`)
        break
    }
  }

  /**
   * Resets store[path].
   */
  onClear = (): void => {
    this.resetValue()
    this.touch()
  }

  /**
   * Marks this field as blurred.
   */
  onBlur = (): void => {
    this.focused = false
    StoreLogger.verbose(this.id, 'onBlur', 'The focused state has been set to false.')

    this.isTouchTriggerBlur && this.touch()
    this.dispatch()
  }

  /**
   * Marks this field as focused.
   */
  onFocus = (): void => {
    this.focused = true
    StoreLogger.verbose(this.id, 'onFocus', `The focused state has been set to true.`)

    this.dispatch()
  }

  /**
   * Enables obscuration if disabled and disables it if enabled.
   */
  onClickToggleObscuration = (): void => {
    this.obscured = !this.obscured
    StoreLogger.debug(this.id, 'onClickToggleObscuration', `The obscuration has been set to ${this.obscured}.`)

    if (this.isTypeBuffer) {
      this.element.type = this.isObscured ? 'password' : 'text'
      StoreLogger.debug(this.id, 'onClickToggleObscuration', `The element type has been set to ${this.element.type}.`)
    }

    this.dispatch()
  }

  resetQuery(): void {
    this.query = ''
    StoreLogger.debug(this.id, 'resetQuery', `The query has been reset.`)

    this.dispatch()
  }

  resetValue(): void {
    switch (this.type) {
      case InputType.BUFFER:
        this.store[this.path] = undefined as any
        StoreLogger.debug(this.id, 'resetValue', this.type, this.mode, `The value has been set to undefined.`)
        break
      case InputType.DATE:
      case InputType.DATE_TIME:
      case InputType.EMAIL:
      case InputType.MONTH:
      case InputType.PASSWORD:
      case InputType.SEARCH:
      case InputType.TEL:
      case InputType.TIME:
      case InputType.URL:
      case InputType.WEEK:
        this.store[this.path] = '' as any
        StoreLogger.debug(this.id, 'resetValue', this.type, this.mode, `The value has been set to an empty string.`)
        break
      case InputType.NUMBER:
        this.store[this.path] = 0 as any
        StoreLogger.debug(this.id, 'resetValue', this.type, this.mode, `The value has been set to 0.`)
        break
      case InputType.TEXT:
        switch (this.mode) {
          case InputMode.MULTIPLE:
            this.store[this.path] = [] as any
            StoreLogger.debug(this.id, 'resetValue', this.type, this.mode, `The value has been set to an empty array.`)

            break
          case InputMode.SINGLE:
            this.store[this.path] = '' as any
            StoreLogger.debug(this.id, 'resetValue', this.type, this.mode, `The value has been set to an empty string.`)

            break
        }
        break
    }
  }

  /**
   * Makes the type readable by the DOM.
   */
  get lowercaseType(): HTMLInputTypeAttribute {
    switch (this.type) {
      case InputType.DATE:
        return 'date'
      case InputType.DATE_TIME:
        return 'datetime-local'
      case InputType.EMAIL:
        return 'email'
      case InputType.MONTH:
        return 'month'
      case InputType.NUMBER:
        return 'number'
      case InputType.BUFFER:
      case InputType.PASSWORD:
        return this.isObscured ? 'password' : 'text'
      case InputType.SEARCH:
        return 'search'
      case InputType.TEL:
        return 'tel'
      case InputType.TEXT:
        return 'text'
      case InputType.TIME:
        return 'time'
      case InputType.URL:
        return 'url'
      case InputType.WEEK:
        return 'week'
    }
  }

  /**
   * A value read from store[path].
   */
  get value(): number | string | string[] | undefined {
    switch (this.type) {
      case InputType.BUFFER:
        return undefined
      case InputType.NUMBER:
        return (this.store[this.path] as any) || 0
      case InputType.DATE:
      case InputType.DATE_TIME:
      case InputType.EMAIL:
      case InputType.MONTH:
      case InputType.PASSWORD:
      case InputType.SEARCH:
      case InputType.TEL:
      case InputType.TIME:
      case InputType.URL:
      case InputType.WEEK:
        return (this.store[this.path] as any) || ''
      case InputType.TEXT:
        switch (this.mode) {
          case InputMode.MULTIPLE:
            return (this.store[this.path] as any) || []
          case InputMode.SINGLE:
            return (this.store[this.path] as any) || ''
        }
    }
  }

  get valueAsNumber(): number {
    return this.value as number
  }

  get valueAsString(): string {
    return this.value as string
  }

  get valueAsStringArray(): string[] {
    return this.value as string[]
  }

  get valueAsUndefined(): undefined {
    return this.value as undefined
  }

  get isBlurred(): boolean {
    return this.focused === false
  }

  get isFocused(): boolean {
    return this.focused === true
  }

  get isModeMultiple(): boolean {
    return this.mode === InputMode.MULTIPLE
  }

  get isModeSingle(): boolean {
    return this.mode === InputMode.SINGLE
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

  get isTouchTriggerNone(): boolean {
    return this.touchTrigger === InputTouchTrigger.NONE
  }

  get isTypeBuffer(): boolean {
    return this.type === InputType.BUFFER
  }

  get isTypeDate(): boolean {
    return this.type === InputType.DATE
  }

  get isTypeDateTime(): boolean {
    return this.type === InputType.DATE_TIME
  }

  get isTypeEmail(): boolean {
    return this.type === InputType.EMAIL
  }

  get isTypeMonth(): boolean {
    return this.type === InputType.MONTH
  }

  get isTypeNumber(): boolean {
    return this.type === InputType.NUMBER
  }

  get isTypePassword(): boolean {
    return this.type === InputType.PASSWORD
  }

  get isTypeSearch(): boolean {
    return this.type === InputType.SEARCH
  }

  get isTypeTel(): boolean {
    return this.type === InputType.TEL
  }

  get isTypeText(): boolean {
    return this.type === InputType.TEXT
  }

  get isTypeTime(): boolean {
    return this.type === InputType.TIME
  }

  get isTypeURL(): boolean {
    return this.type === InputType.URL
  }

  get isTypeWeek(): boolean {
    return this.type === InputType.WEEK
  }

  get isTypeBufferOrPassword(): boolean {
    return this.isTypeBuffer || this.isTypePassword
  }
}
