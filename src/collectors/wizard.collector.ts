import { ComponentCollector } from '../modules/component.collector'
import { WizardStore } from '../stores/wizard.store'

/**
 * The collector of {@link WizardStore} components, see {@link ComponentCollector}.
 *
 * @category Collector
 */
export const WizardCollector = new ComponentCollector<WizardStore>(new WizardStore({ steps: [] }))
