import { ComponentCollector } from '../modules/component.collector'
import { SidebarStore } from '../stores/sidebar.store'

/**
 * @category Collector
 */
export const SidebarCollector = new ComponentCollector<SidebarStore>(new SidebarStore())
