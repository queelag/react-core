import { ID, noop, NumberUtils } from '@queelag/core'
import { Buffer } from 'buffer'
import { ChangeEvent, MutableRefObject } from 'react'
import * as S from 'superstruct'
import { ComponentName, InputType, Layer } from '../definitions/enums'
import { InputProps } from '../definitions/props'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'

/**
 * @category Store
 */
export class InputStore<T extends object> extends ComponentFormFieldStore<HTMLInputElement, T> {
  focused: boolean
  obscured: boolean
  type: InputType

  constructor(
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.TWO,
    path: keyof T = '' as any,
    ref: MutableRefObject<HTMLInputElement> = Dummy.ref,
    schema: S.Struct<any, any> = Dummy.schema,
    store: T = {} as any,
    touched: boolean = false,
    type: InputType = InputType.TEXT,
    update: () => void = noop
  ) {
    super(ComponentName.INPUT, id, label, layer, path, ref, false, schema, store, touched, update)

    this.focused = false
    this.obscured = true
    this.type = type
  }

  detachInputFromReact(autoFocus: boolean = false): void {
    let input: HTMLInputElement

    input = document.createElement('input')
    input.autocapitalize = this.inputElement.autocapitalize
    input.autocomplete = this.inputElement.autocomplete
    input.className = this.inputElement.className
    input.placeholder = this.inputElement.placeholder
    input.type = this.lowercaseType

    input.addEventListener('blur', this.onBlur)
    input.addEventListener('change', this.onChange as any)
    input.addEventListener('focus', this.onFocus)

    this.inputElement.replaceWith(input)

    autoFocus && input.focus()
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    switch (this.type) {
      case InputType.BUFFER:
        this.store[this.path] = Buffer.from(event.target.value) as any
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

  onFocus = (): void => {
    this.focused = true
    this.update()
  }

  onBlur = (): void => {
    this.focused = false
    this.update()
  }

  onClickIncreaseValue = (): void => {
    this.onChange({ target: { value: ((this.value as number) + 1).toString() } } as any)
  }

  onClickDecreaseValue = (): void => {
    this.onChange({ target: { value: ((this.value as number) - 1).toString() } } as any)
  }

  onClickToggleObscuration = (): void => {
    this.obscured = !this.obscured

    if (this.isTypeBuffer) {
      this.inputElement.type = this.obscured ? 'password' : 'text'
    }

    this.update()
  }

  get inputElement(): HTMLInputElement {
    return this.element.querySelector('input') || document.createElement('input')
  }

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
