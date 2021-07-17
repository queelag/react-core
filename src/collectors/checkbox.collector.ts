import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { CheckboxStore } from '../stores/checkbox.store'

/**
 * The collector of {@link CheckboxStore} components, see {@link ComponentCollector}.
 *
 * @category Collector
 */
export const CheckboxCollector = new ComponentFormFieldCollector<HTMLDivElement, any, CheckboxStore<any>>(new CheckboxStore({ path: 'a', store: { a: '' } }))
