import { ID, Logger, rv, URLUtils } from '@queelag/core'
import { Parent } from '../components/Parent'
import { ComponentName } from '../definitions/enums'
import { RouterProps } from '../definitions/props'
import { Route, RouteParameters, RoutePartial } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

export class RouterStore extends ComponentStore<HTMLDivElement> {
  history: string[]
  routes: Route[]

  constructor(id: ID = '', routes: RoutePartial[] = []) {
    super(ComponentName.ROUTER, id)

    this.history = []
    this.routes = this.toFlatRoutes(routes, { ...Dummy.route, component: Parent })

    Logger.debug('RouterStore', 'constructor', `The routes have been flattened.`, routes, this.routes)

    this.registerPopstateEventListener()
    this.history.push(this.findRouteByLocation().name)
    this.onHistoryChange()
  }

  goto(name: string, parameters: RouteParameters = {}, clear: boolean = false, redirect: boolean = false): void {
    let route: Route, last: Route

    route = this.findRouteByName(name)
    if (!route.name) return Logger.error('RouterStore', 'goto', `The route ${name} does not exist`)

    last = this.last
    if (last.name === route.name) return Logger.error('RouterStore', 'goto', `You are already inside the route ${name}`)

    route.parameters = parameters
    Logger.debug('RouterStore', 'goto', `The route parameters have been set.`, route)

    if (redirect) {
      this.history[this.history.length - 1] = route.name
      Logger.debug('RouterStore', 'goto', `The last history item has been replaced with the route ${name}.`, this.history)
    } else {
      this.history.push(route.name)
      Logger.debug('RouterStore', 'goto', `The route ${name} has been pushed to the history.`, this.history)
    }

    if (clear) {
      this.clear()
    }

    this.replaceHistoryState(route, parameters)
    this.update()
  }

  redirect(name: string, parameters: RouteParameters = {}, clear: boolean = false): void {
    return this.goto(name, parameters, clear, true)
  }

  back = (): void => {
    if (this.canGoBack) {
      this.history.pop()
      Logger.debug('RouterStore', 'back', `The last history item has been removed.`, this.history)

      this.replaceHistoryState(this.last, this.last.parameters)
      this.update()
    }
  }

  clear = (): void => {
    if (this.history.length > 0) {
      this.history = [this.history[this.history.length - 1]]
      Logger.debug('RouterStore', 'clear', `The history has been cleared.`, this.history)
    }
  }

  onHistoryChange(): void {
    let destination: Route

    destination = this.findRedirectDestinationByRoute(this.last)
    if (!destination.name)
      return rv(() => this.last.redirect.length >= 2 && Logger.error(`The redirection route ${this.last.redirect.join(', ')} does not exist`))

    this.goto(destination.name, {}, true)
  }

  private registerPopstateEventListener = (): void => {
    if (this.routes.length <= 0) {
      Logger.warn('RouterStore', 'registerPopstateEventListener', `There are no routes, the popstate event will not be registered.`)
      return
    }

    window.history.pushState({}, '', window.location.href)
    window.addEventListener('popstate', () => {
      window.history.pushState({}, '', window.location.href)
      this.back()
    })

    Logger.debug('RouterStore', 'registerPopstateEventListener', `The popstate event listener has been registered.`)
  }

  private replaceHistoryState(route: Route, parameters: RouteParameters): void {
    let data: any, title: string, url: string

    data = {}
    title = route.name
    url = this.toRouteURL(route, parameters)

    window.history.replaceState(data, title, url)
    Logger.debug('RouterStore', 'replaceHistoryState', `The history state has been replaced.`, [data, title, url])
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

  findRouteURLByName(name: string, parameters: RouteParameters): string {
    return this.toRouteURL(this.findRouteByName(name), parameters)
  }

  findRouteByLocation(): Route {
    let route: Route | undefined, splitted: [string[], string[]]

    route = this.routes.find((v: Route) => v.regex.test(window.location.pathname.replace(/(^\/|\/$)/g, '')))
    if (!route) return Dummy.route

    splitted = [route.path.split('/'), window.location.pathname.replace(/(^\/|\/$)/g, '').split('/')]
    if (splitted.length < 2) return route

    for (let i = 0; i < splitted[0].length; i++) {
      if (splitted[0][i].charAt(0) === ':') {
        splitted[0][i] = splitted[0][i].slice(1)
        Logger.debug('RouterStore', 'findRouteByLocation', `The first character of the parameter ${splitted[0][i]} has been removed.`)

        route.parameters[splitted[0][i]] = splitted[1][i]
        Logger.debug('RouterStore', 'findRouteByLocation', `The parameter ${splitted[0][i]} has been set to ${splitted[1][i]}.`, route.parameters)
      }
    }

    return route
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
      route.regex = new RegExp(route.path.replace(/:[^\/]+/g, '[^/]+').replace(/\//g, '\\/'))

      return [...r, route, ...this.toFlatRoutes(v.children || [], route)]
    }, [])
  }

  toRouteURL(route: Route, parameters: RouteParameters): string {
    let path: string

    path = route.path
    Logger.debug('RouterStore', 'toRoutePathWithParameters', `The path has been set to ${route.path}.`)

    Object.entries(parameters).forEach((v: [string, string]) => {
      path = path.replace(':' + v[0], v[1])
      Logger.debug('RouterStore', 'replaceHistoryState', `The parameter ${v[0]} has been set to ${v[1]}.`, v, path)
    })

    return URLUtils.concat(window.location.origin, path, window.location.search)
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

export const ROUTER_STORE_KEYS: (keyof RouterProps & keyof RouterStore)[] = ['id']
