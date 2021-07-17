import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { InputStore } from '../stores/input.store'

/**
 * The collector of {@link InputStore} components, see {@link ComponentFormFieldCollector}.
 *
 * @category Collector
 */
export const InputCollector = new ComponentFormFieldCollector<HTMLInputElement, any, InputStore<any>>(new InputStore({ path: 'a', store: { a: '' } }))
