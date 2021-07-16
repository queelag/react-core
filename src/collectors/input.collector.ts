import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { InputStore } from '../stores/input.store'

/**
 * @category Collector
 */
export const InputCollector = new ComponentFormFieldCollector<HTMLInputElement, any, InputStore<any>>(new InputStore())
