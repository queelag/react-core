import { ComponentCollector } from '../modules/component.collector'
import { SidebarStore } from '../stores/sidebar.store'

export const SidebarCollector = new ComponentCollector<SidebarStore>(new SidebarStore())
