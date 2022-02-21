import { ChangeEvent, KeyboardEvent } from 'react'
import { ComponentName, TextAreaMode, TextAreaTouchTrigger } from '../definitions/enums'
import { ComponentFormFieldStoreProps } from '../definitions/with.superstruct.interfaces'
import { TextAreaProps } from '../definitions/with.superstruct.props'
import { StoreLogger } from '../loggers/store.logger'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'

/**
 * An abstraction for Input stores, handles focus, obscuration and types.
 *
 * @category Store
 */
export class TextAreaStore<T extends object> extends ComponentFormFieldStore<HTMLTextAreaElement, T> {
  /**
   * A boolean which determines if this textarea is focused or not.
   */
  focused: boolean
  /**
   * An {@link TextAreaMode} which determines how the internal logic behaves.
   */
  mode: TextAreaMode
  /**
   * A string which contains the potential value to be pushed when the mode is set to MULTIPLE.
   */
  query: string
  /**
   * An {@link TextAreaTouchTrigger} which determines when this textarea is marked as touched.
   */
  touchTrigger: TextAreaTouchTrigger

  constructor(props: TextAreaProps<T> & ComponentFormFieldStoreProps<HTMLTextAreaElement, T>) {
    super(ComponentName.TEXT_AREA, props)

    this.focused = false
    this.mode = props.mode || TextAreaMode.SINGLE
    this.query = ''
    this.touchTrigger = props.touchTrigger || TextAreaTouchTrigger.BLUR
  }

  /**
   * Updates store[path] based on the type.
   */
  onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    switch (this.mode) {
      case TextAreaMode.MULTIPLE:
        this.query = event.target.value
        StoreLogger.debug(this.id, 'onChange', this.mode, `The query has been set to ${this.query}.`)

        this.update()

        break
      case TextAreaMode.SINGLE:
        this.store[this.path] = event.target.value as any
        StoreLogger.debug(this.id, 'onChange', this.mode, `The value has been set to ${this.value}.`)

        break
    }

    switch (this.touchTrigger) {
      case TextAreaTouchTrigger.BLUR:
      case TextAreaTouchTrigger.NONE:
        this.validate()
        break
      case TextAreaTouchTrigger.CHANGE:
        this.touch()
        break
    }
  }

  /**
   * Pushes query to store[path] if the type is TEXT and the mode is MULTIPLE.
   */
  onKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    switch (event.key) {
      case 'Enter':
        switch (this.mode) {
          case TextAreaMode.MULTIPLE:
            if (this.query.length <= 0) {
              StoreLogger.warn(this.id, 'onKeyUp', `The query is empty.`)
              return
            }

            this.store[this.path] = [...this.valueAsStringArray, this.query.replace(/\n$/m, '')] as any
            StoreLogger.debug(this.id, 'onKeyUp', `The query has been pushed to the value.`, this.value)

            this.query = ''
            StoreLogger.debug(this.id, 'onKeyUp', `The query has been reset.`)

            this.update()
            this.touch()

            break
        }

        break
    }
  }

  /**
   * Removes an item from store[path] if the mode is MULTIPLE.
   */
  onClickRemoveItem = (item: string): void => {
    switch (this.mode) {
      case TextAreaMode.MULTIPLE:
        this.store[this.path] = this.valueAsStringArray.filter((v: string) => v !== item) as any
        StoreLogger.debug(this.id, 'onClickRemoveItem', `The item ${item} has been removed from the value.`, this.value)

        this.touch()

        break
      case TextAreaMode.SINGLE:
        StoreLogger.warn(this.id, 'onClickRemoveItem', `The remove function does not work with the ${this.mode} mode.`)
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
  }

  /**
   * Marks this field as focused.
   */
  onFocus = (): void => {
    this.focused = true
    StoreLogger.verbose(this.id, 'onFocus', `The focused state has been set to true.`)

    this.update()
  }

  resetQuery(): void {
    this.query = ''
    StoreLogger.debug(this.id, 'resetQuery', `The query has been reset.`)

    this.update()
  }

  resetValue(): void {
    switch (this.mode) {
      case TextAreaMode.MULTIPLE:
        this.store[this.path] = [] as any
        StoreLogger.debug(this.id, 'resetValue', this.mode, `The value has been set to an empty array.`)

        break
      case TextAreaMode.SINGLE:
        this.store[this.path] = '' as any
        StoreLogger.debug(this.id, 'resetValue', this.mode, `The value has been set to an empty string.`)

        break
    }
  }

  /**
   * A value read from store[path].
   */
  get value(): string | string[] {
    switch (this.mode) {
      case TextAreaMode.MULTIPLE:
        return (this.store[this.path] as any) || []
      case TextAreaMode.SINGLE:
        return (this.store[this.path] as any) || ''
    }
  }

  get valueAsString(): string {
    return this.value as string
  }

  get valueAsStringArray(): string[] {
    return this.value as string[]
  }

  get isBlurred(): boolean {
    return this.focused === false
  }

  get isFocused(): boolean {
    return this.focused === true
  }

  get isModeMultiple(): boolean {
    return this.mode === TextAreaMode.MULTIPLE
  }

  get isModeSingle(): boolean {
    return this.mode === TextAreaMode.SINGLE
  }

  get isTouchTriggerBlur(): boolean {
    return this.touchTrigger === TextAreaTouchTrigger.BLUR
  }

  get isTouchTriggerChange(): boolean {
    return this.touchTrigger === TextAreaTouchTrigger.CHANGE
  }

  get isTouchTriggerNone(): boolean {
    return this.touchTrigger === TextAreaTouchTrigger.NONE
  }
}
