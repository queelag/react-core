import { tcp } from '@queelag/core'
import { FormEvent } from 'react'
import { CheckBoxCollector } from '../collectors/check.box.collector'
import { InputCollector } from '../collectors/input.collector'
import { InputFileCollector } from '../collectors/input.file.collector'
import { SelectCollector } from '../collectors/select.collector'
import { ComponentName } from '../definitions/enums'
import { ComponentLayerStoreProps } from '../definitions/interfaces'
import { FormProps } from '../definitions/props'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { CheckBoxStore } from './check.box.store'
import { InputFileStore } from './input.file.store'
import { InputStore } from './input.store'
import { SelectStore } from './select.store'

/**
 * An abstraction for Form stores, handles validation of all child fields.
 *
 * @category Store
 */
export class FormStore extends ComponentLayerStore<HTMLFormElement> {
  constructor(props: FormProps & ComponentLayerStoreProps<HTMLFormElement>) {
    super(ComponentName.FORM, props)

    this.onSubmit = props.onSubmit
  }

  /** @internal */
  private _onSubmit(event: FormEvent<HTMLFormElement>): any {}

  /**
   * An event triggered by submitting this form.
   */
  get onSubmit(): (event: FormEvent<HTMLFormElement>) => any {
    return this._onSubmit
  }

  /**
   * An array of child CheckBox stores.
   */
  get checkBoxStores(): CheckBoxStore<any>[] {
    let stores: CheckBoxStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.CHECKBOX}']`).forEach((v: Element) => {
      stores.push(CheckBoxCollector.get(v.id))
    })

    return stores
  }

  /**
   * An array of child Input stores.
   */
  get inputStores(): InputStore<any>[] {
    let stores: InputStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.INPUT}']`).forEach((v: Element) => {
      stores.push(InputCollector.get(v.id))
    })

    return stores
  }

  /**
   * An array of child InputFile stores.
   */
  get inputFileStores(): InputFileStore<any>[] {
    let stores: InputFileStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.INPUT_FILE}']`).forEach((v: Element) => {
      stores.push(InputFileCollector.get(v.id))
    })

    return stores
  }

  /**
   * An array of child Select stores.
   */
  get selectStores(): SelectStore<any>[] {
    let stores: SelectStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.SELECT}']`).forEach((v: Element) => {
      stores.push(SelectCollector.get(v.id))
    })

    return stores
  }

  /**
   * Checks if every child field is valid.
   */
  get isValid(): boolean {
    return (
      this.checkBoxStores.every((v: CheckBoxStore<any>) => v.isValid) &&
      this.inputStores.every((v: InputStore<any>) => v.isValid) &&
      this.inputFileStores.every((v: InputFileStore<any>) => v.isValid) &&
      this.selectStores.every((v: SelectStore<any>) => v.isValid)
    )
  }

  /** @internal */
  set onSubmit(onSubmit: (event: FormEvent<HTMLFormElement>) => any) {
    this._onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      this.checkBoxStores.forEach((v: CheckBoxStore<any>) => v.touch())
      this.inputStores.forEach((v: InputStore<any>) => v.touch())
      this.inputFileStores.forEach((v: InputFileStore<any>) => v.touch())
      this.selectStores.forEach((v: SelectStore<any>) => v.touch())

      this.isValid && (await tcp(() => onSubmit(event)))

      this.inputStores.forEach((v: InputStore<any>) => v.element.blur())
    }
  }
}

/** @category Constant */
export const FORM_STORE_KEYS: (keyof FormProps & keyof FormStore)[] = ['id', 'onSubmit']
