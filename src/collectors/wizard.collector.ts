import { ComponentCollector } from '../modules/component.collector'
import { WizardStore } from '../stores/wizard.store'

/**
 * @category Collector
 */
export const WizardCollector = new ComponentCollector<WizardStore>(new WizardStore())
