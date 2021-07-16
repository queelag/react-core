import { ComponentCollector } from '../modules/component.collector'
import { BottomTabberStore } from '../stores/bottom.tabber.store'

/**
 * @category Collector
 */
export const BottomTabberCollector = new ComponentCollector<BottomTabberStore>(new BottomTabberStore())
