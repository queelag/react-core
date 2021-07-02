import { ID, noop, tcp } from '@queelag/core'
import { FormEvent, MutableRefObject } from 'react'
import { CheckboxCollector } from '../collectors/checkbox.collector'
import { InputCollector } from '../collectors/input.collector'
import { InputFileCollector } from '../collectors/input.file.collector'
import { SelectCollector } from '../collectors/select.collector'
import { ComponentName, Layer } from '../definitions/enums'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { CheckboxStore } from './checkbox.store'
import { InputFileStore } from './input.file.store'
import { InputStore } from './input.store'
import { SelectStore } from './select.store'

export class FormStore extends ComponentLayerStore<HTMLFormElement> {
  constructor(
    id: ID = '',
    layer: Layer = Layer.TWO,
    onSubmit: (event: FormEvent<HTMLFormElement>) => any = noop,
    ref: MutableRefObject<HTMLFormElement>,
    update: () => void = noop
  ) {
    super(ComponentName.FORM, id, layer, ref, update)

    this.onSubmit = onSubmit
  }

  private _onSubmit(event: FormEvent<HTMLFormElement>): any {}

  get onSubmit(): (event: FormEvent<HTMLFormElement>) => any {
    return this._onSubmit
  }

  get checkboxes(): CheckboxStore<any>[] {
    let stores: CheckboxStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.CHECKBOX}']`).forEach((v: Element) => {
      stores.push(CheckboxCollector.get(v.id))
    })

    return stores
  }

  get inputs(): InputStore<any>[] {
    let stores: InputStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.INPUT}']`).forEach((v: Element) => {
      stores.push(InputCollector.get(v.id))
    })

    return stores
  }

  get inputFiles(): InputFileStore<any>[] {
    let stores: InputFileStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.INPUT_FILE}']`).forEach((v: Element) => {
      stores.push(InputFileCollector.get(v.id))
    })

    return stores
  }

  get selects(): SelectStore<any>[] {
    let stores: SelectStore<any>[] = []

    this.element.querySelectorAll(`[id^='${ComponentName.SELECT}']`).forEach((v: Element) => {
      stores.push(SelectCollector.get(v.id))
    })

    return stores
  }

  get isValid(): boolean {
    return (
      this.checkboxes.every((v: CheckboxStore<any>) => v.isValid) &&
      this.inputs.every((v: InputStore<any>) => v.isValid) &&
      this.inputFiles.every((v: InputFileStore<any>) => v.isValid) &&
      this.selects.every((v: SelectStore<any>) => v.isValid)
    )
  }

  set onSubmit(onSubmit: (event: FormEvent<HTMLFormElement>) => any) {
    this._onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      console.log(this.checkboxes, this.inputs, this.inputFiles, this.selects)

      this.checkboxes.forEach((v: CheckboxStore<any>) => v.touch())
      this.inputs.forEach((v: InputStore<any>) => v.touch())
      this.inputFiles.forEach((v: InputFileStore<any>) => v.touch())
      this.selects.forEach((v: SelectStore<any>) => v.touch())

      this.isValid && (await tcp(() => onSubmit(event)))

      this.inputs.forEach((v: InputStore<any>) => v.inputElement.blur())
    }
  }
}
