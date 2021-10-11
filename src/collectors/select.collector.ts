import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { SelectStore } from '../stores/select.store'

/**
 * The collector of {@link SelectStore} components, see {@link ComponentFormFieldCollector}.
 *
 * @category Collector
 */
export const SelectCollector = new ComponentFormFieldCollector<HTMLDivElement, any, SelectStore<any>>(new SelectStore({ options: [] }))
