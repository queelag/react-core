import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { SwitchStore } from '../stores/switch.store'

/**
 * @category Collector
 */
export const SwitchCollector = new ComponentFormFieldCollector<HTMLDivElement, any, SwitchStore<any>>(new SwitchStore())
