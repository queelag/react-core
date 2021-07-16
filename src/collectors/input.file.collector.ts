import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { InputFileStore } from '../stores/input.file.store'

/**
 * @category Collector
 */
export const InputFileCollector = new ComponentFormFieldCollector<HTMLInputElement, any, InputFileStore<any>>(new InputFileStore())
