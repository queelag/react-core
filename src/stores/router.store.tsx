import { rv } from '@queelag/core'
import { makeObservable, observable } from 'mobx'
import { Parent } from '../components/Parent'
import { ComponentName } from '../definitions/enums'
import { Route, RoutePartial } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

export class RouterStore extends ComponentStore<HTMLDivElement> {
  name: string
  history: string[]
  routes: Route[]

  constructor(name: string = '', routes: RoutePartial[] = []) {
    super(ComponentName.ROUTER)

    this.name = name
    this.history = []
    this.routes = this.toFlatRoutes(routes, { ...Dummy.route, component: Parent })

    makeObservable(this, { history: observable })

    this.registerPopstateEventListener()
    this.history.push(this.findRouteByLocation().name)
    this.onHistoryChange()
  }

  goto(name: string, redirect: boolean = false, clear: boolean = false): void {
    let route: Route, last: Route

    route = this.findRouteByName(name)
    if (!route.name) return console.error(`The route ${name} does not exist`)

    last = this.last
    if (last.name === route.name) return console.error(`You are already inside the route ${name}`)

    redirect && this.history.length > 0 ? (this.history[this.history.length - 1] = route.name) : this.history.push(route.name)
    this.replaceHistoryState(route)

    clear && this.clear()
  }

  back = (): void => {
    if (this.canGoBack) {
      this.history.pop()
      this.replaceHistoryState(this.last)
    }
  }

  clear = (): void => {
    this.history.length > 0 && (this.history = [this.history[this.history.length - 1]])
  }

  onHistoryChange(): void {
    let destination: Route

    destination = this.findRedirectDestinationByRoute(this.last)
    if (!destination.name)
      return rv(() => this.last.redirect.length >= 2 && console.error(`The redirection route ${this.last.redirect.join(', ')} does not exist`))

    this.goto(destination.name, true)
  }

  private registerPopstateEventListener = (): void => {
    window.history.pushState({}, '', window.location.href)
    window.addEventListener('popstate', () => {
      window.history.pushState({}, '', window.location.href)
      this.back()
    })
  }

  private replaceHistoryState(route: Route): void {
    window.history.replaceState({}, route.name, [window.location.origin, route.path, window.location.search].join('/'))
  }

  findRedirectDestinationByRoute(route: Route): Route {
    return typeof route.redirect[0] === 'string' && typeof route.redirect[1] === 'string'
      ? [route.redirect[0], this.findRouteByName(route.redirect[0]).path].includes(window.location.pathname.replace(/(^\/|\/$)/g, ''))
        ? this.findRouteByName(route.redirect[1])
        : Dummy.route
      : Dummy.route
  }

  findRouteByName(name: string): Route {
    return this.routes.find((v: Route) => v.name === name) || Dummy.route
  }

  findRouteByLocation(): Route {
    return this.routes.find((v: Route) => v.path === window.location.pathname.replace(/(^\/|\/$)/g, '')) || Dummy.route
  }

  toFlatRoutes(routes: RoutePartial[], parent: Route): Route[] {
    return routes.reduce((r: Route[], v: RoutePartial) => {
      let route: Route

      route = Dummy.route
      route.component = v.component
      route.name = v.name
      route.parent = parent.component
      route.path = [parent.name, v.name]
        .filter((v: string) => v && v.length > 0)
        .join('/')
        .toLowerCase()
      route.redirect = v.redirect || []

      return [...r, route, ...this.toFlatRoutes(v.children || [], route)]
    }, [])
  }

  canGoto(name: string): boolean {
    return this.last.name !== name
  }

  get canGoBack(): boolean {
    return this.history.length >= 2
  }

  get last(): Route {
    return this.routes.find((v: Route) => v.name === this.history[this.history.length - 1]) || Dummy.route
  }
}
