import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { CheckBoxStore } from '../stores/check.box.store'

/**
 * The collector of {@link CheckBoxStore} components, see {@link ComponentCollector}.
 *
 * @category Collector
 */
export const CheckBoxCollector = new ComponentFormFieldCollector<HTMLDivElement, any, CheckBoxStore<any>>(new CheckBoxStore({}))
