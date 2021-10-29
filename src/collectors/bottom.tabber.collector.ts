import { ComponentCollector } from '../modules/component.collector'
import { BottomTabberStore } from '../stores/bottom.tabber.store'

/**
 * The collector of {@link BottomTabberStore} components, see {@link ComponentCollector}.
 *
 * @category Collector
 */
export const BottomTabberCollector = new ComponentCollector<BottomTabberStore>(new BottomTabberStore({ items: [] }))
