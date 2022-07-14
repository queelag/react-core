import { noop, tcp } from '@queelag/core'
import { FormEvent } from 'react'
import { CheckBoxCollector } from '../collectors/check.box.collector'
import { InputCollector } from '../collectors/input.collector'
import { InputFileCollector } from '../collectors/input.file.collector'
import { SelectCollector } from '../collectors/select.collector'
import { SwitchCollector } from '../collectors/switch.collector'
import { TextAreaCollector } from '../collectors/text.area.collector'
import { ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { FormProps } from '../definitions/props'
import { StoreLogger } from '../loggers/store.logger'
import { ComponentFormFieldStore } from '../modules/component.form.field.store'
import { ComponentStore } from '../modules/component.store'
import { CheckBoxStore } from './check.box.store'
import { InputFileStore } from './input.file.store'
import { InputStore } from './input.store'
import { SelectStore } from './select.store'
import { SwitchStore } from './switch.store'
import { TextAreaStore } from './text.area.store'

/**
 * An abstraction for Form stores, handles validation of all child fields.
 *
 * @category Store
 */
export class FormStore extends ComponentStore<HTMLFormElement> {
  /**
   * A boolean which determines if this form is disabled or not.
   */
  disabled: boolean

  constructor(props: FormProps & ComponentStoreProps<HTMLFormElement>) {
    super(ComponentName.FORM, props)

    this.disabled = props.disabled || false
    this.onSubmit = props.onSubmit || noop
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
   * An array of child FormField stores.
   */
  get stores(): ComponentFormFieldStore<any, any>[] {
    return [...this.checkBoxStores, ...this.inputStores, ...this.inputFileStores, ...this.selectStores, ...this.switchStores, ...this.textAreaStores]
  }

  /**
   * An array of child CheckBox stores.
   */
  get checkBoxStores(): CheckBoxStore<any>[] {
    return [...this.element.querySelectorAll(`[id^='${ComponentName.CHECK_BOX}']`)]
      .map((v: Element) => CheckBoxCollector.get(v.id))
      .filter((v: CheckBoxStore<any>) => v instanceof CheckBoxStore)
  }

  /**
   * An array of child Input stores.
   */
  get inputStores(): InputStore<any>[] {
    return [...this.element.querySelectorAll(`[id^='${ComponentName.INPUT}']`)]
      .map((v: Element) => InputCollector.get(v.id))
      .filter((v: InputStore<any>) => v instanceof InputStore)
  }

  /**
   * An array of child InputFile stores.
   */
  get inputFileStores(): InputFileStore<any>[] {
    return [...this.element.querySelectorAll(`[id^='${ComponentName.INPUT_FILE}']`)]
      .map((v: Element) => InputFileCollector.get(v.id))
      .filter((v: InputFileStore<any>) => v instanceof InputFileStore)
  }

  /**
   * An array of child Select stores.
   */
  get selectStores(): SelectStore<any>[] {
    return [...this.element.querySelectorAll(`[id^='${ComponentName.SELECT}']`)]
      .map((v: Element) => SelectCollector.get(v.id))
      .filter((v: SelectStore<any>) => v instanceof SelectStore)
  }

  /**
   * An array of child Switch stores.
   */
  get switchStores(): SwitchStore<any>[] {
    return [...this.element.querySelectorAll(`[id^='${ComponentName.SWITCH}']`)]
      .map((v: Element) => SwitchCollector.get(v.id))
      .filter((v: SwitchStore<any>) => v instanceof SwitchStore)
  }

  /**
   * An array of child TextArea stores.
   */
  get textAreaStores(): TextAreaStore<any>[] {
    return [...this.element.querySelectorAll(`[id^='${ComponentName.TEXT_AREA}']`)]
      .map((v: Element) => TextAreaCollector.get(v.id))
      .filter((v: TextAreaStore<any>) => v instanceof TextAreaStore)
  }

  get isDisabled(): boolean {
    return this.disabled === true
  }

  get isEnabled(): boolean {
    return this.disabled === false
  }

  /**
   * Checks if every child field is valid.
   */
  get isValid(): boolean {
    return this.stores.every((v: ComponentFormFieldStore<any, any>) => v.isValid)
  }

  /** @internal */
  set onSubmit(onSubmit: (event: FormEvent<HTMLFormElement>) => any) {
    this._onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (this.isDisabled) {
        return StoreLogger.warn(this.id, 'onSubmit', `Execution stopped, disabled is truthy.`)
      }

      this.stores.forEach((v: ComponentFormFieldStore<any, any>) => {
        v.touch()
        v.validate()
      })

      if (this.isValid) {
        this.disabled = true
        StoreLogger.verbose(this.id, 'onSubmit', `The disabled state has been set to true.`)

        await tcp(() => onSubmit(event))
        StoreLogger.debug(this.id, 'onSubmit', `The onSubmit function has been fired.`, onSubmit)

        this.disabled = false
        StoreLogger.verbose(this.id, 'onSubmit', `The disabled state has been set to false.`)
      }
    }
  }
}
