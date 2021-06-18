import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { SelectStore } from '../stores/select.store'

export const SelectCollector = new ComponentFormFieldCollector<HTMLDivElement, any, SelectStore<any>>(new SelectStore())
