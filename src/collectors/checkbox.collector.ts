import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { CheckboxStore } from '../stores/checkbox.store'

/**
 * @category Collector
 */
export const CheckboxCollector = new ComponentFormFieldCollector<HTMLDivElement, any, CheckboxStore<any>>(new CheckboxStore())
