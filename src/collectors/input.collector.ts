import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { InputStore } from '../stores/input.store'

export const InputCollector = new ComponentFormFieldCollector<HTMLInputElement, any, InputStore<any>>(new InputStore())
