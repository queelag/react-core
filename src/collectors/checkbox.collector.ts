import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { CheckboxStore } from '../stores/checkbox.store'

export const CheckboxCollector = new ComponentFormFieldCollector<HTMLDivElement, any, CheckboxStore<any>>(new CheckboxStore())
