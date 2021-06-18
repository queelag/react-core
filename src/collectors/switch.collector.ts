import { ComponentFormFieldCollector } from '../modules/component.form.field.collector'
import { SwitchStore } from '../stores/switch.store'

export const SwitchCollector = new ComponentFormFieldCollector<HTMLDivElement, any, SwitchStore<any>>(new SwitchStore())
