import { ID, noop } from '@queelag/core'
import Joi from 'joi'
import { MutableRefObject } from 'react'
import { ComponentName, Layer } from '../definitions/enums'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { Dummy } from '../modules/dummy'

export class SwitchStore<T extends object> extends ComponentFormFieldStore<HTMLDivElement, T> {
  disabled: boolean
  touchStartTranslated: number
  touchStartX: number

  constructor(
    disabled: boolean = false,
    id: ID = '',
    label: string = '',
    layer: Layer = Layer.TWO,
    path: keyof T = '' as any,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    store: T = {} as any,
    update: () => void = noop
  ) {
    super(ComponentName.SWITCH, id, label, layer, path, ref, false, Joi.any(), store, false, update)

    this.disabled = disabled
    this.touchStartTranslated = 0
    this.touchStartX = 0
  }

  onChange = (value: boolean): void => {
    if (this.isEnabled) {
      this.store[this.path] = value as any
    }
  }

  onChangeCallback = (value: boolean): any => {}

  onClick = (): void => {
    this.onChange(!this.value)
  }

  get value(): boolean {
    return (this.store[this.path] as any) || false
  }

  get isDisabled(): boolean {
    return this.disabled === true
  }

  get isEnabled(): boolean {
    return this.disabled === false
  }

  get isOff(): boolean {
    return this.value === false
  }

  get isOn(): boolean {
    return this.value === true
  }
}
