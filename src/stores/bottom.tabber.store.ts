import { ComponentName } from '../definitions/enums'
import { BottomTabberItem } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'
import { RouterStore } from './router.store'

export class BottomTabberStore extends ComponentStore<HTMLDivElement> {
  items: BottomTabberItem[]
  router: RouterStore

  constructor(items: BottomTabberItem[] = [], name: string = ComponentName.BOTTOM_TABBER, router: RouterStore = new RouterStore()) {
    super(name)

    this.items = items
    this.router = router
  }

  onClickItem(item: BottomTabberItem): void {
    this.router.goto(item.name, true)
  }

  findItemByName(name: string): BottomTabberItem {
    return this.items.find((v: BottomTabberItem) => v.name === name) || Dummy.bottomTabberItem
  }

  findItemIndexByName(name: string): number {
    return this.items.findIndex((v: BottomTabberItem) => v.name === name)
  }
}
