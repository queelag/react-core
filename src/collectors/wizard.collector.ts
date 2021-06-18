import { ComponentCollector } from '../modules/component.collector'
import { WizardStore } from '../stores/wizard.store'

export const WizardCollector = new ComponentCollector<WizardStore>(new WizardStore())
