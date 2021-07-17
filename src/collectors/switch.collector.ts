import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { SwitchStore } from '../stores/switch.store'

/**
 * The collector of {@link SwitchStore} components, see {@link ComponentFormFieldCollector}.
 *
 * @category Collector
 */
export const SwitchCollector = new ComponentFormFieldCollector<HTMLDivElement, any, SwitchStore<any>>(new SwitchStore({ path: 'a', store: { a: '' } }))
