import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { InputFileStore } from '../stores/input.file.store'

/**
 * The collector of {@link InputFileStore} components, see {@link ComponentFormFieldCollector}.
 *
 * @category Collector
 */
export const InputFileCollector = new ComponentFormFieldCollector<HTMLInputElement, any, InputFileStore<any>>(
  new InputFileStore({ path: 'a', store: { a: '' } })
)
