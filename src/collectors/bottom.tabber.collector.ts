import { ComponentCollector } from '../modules/component.collector'
import { BottomTabberStore } from '../stores/bottom.tabber.store'

export const BottomTabberCollector = new ComponentCollector<BottomTabberStore>(new BottomTabberStore())
