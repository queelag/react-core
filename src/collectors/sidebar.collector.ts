import { ComponentCollector } from '../modules/component.collector'
import { SidebarStore } from '../stores/sidebar.store'

/**
 * The collector of {@link SidebarStore} components, see {@link ComponentCollector}.
 *
 * @category Collector
 */
export const SidebarCollector = new ComponentCollector<SidebarStore>(new SidebarStore({ context: {} as any, items: [] }))
