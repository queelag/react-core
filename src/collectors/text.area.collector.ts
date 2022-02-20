import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { TextAreaStore } from '../stores/text.area.store'

/**
 * The collector of {@link TextAreaStore} components, see {@link ComponentFormFieldCollector}.
 *
 * @category Collector
 */
export const TextAreaCollector = new ComponentFormFieldCollector<HTMLTextAreaElement, any, TextAreaStore<any>>(new TextAreaStore({ novalidate: true }))
