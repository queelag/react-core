import { Environment, tcp } from '@queelag/core'
import { Color, ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { IconProps } from '../definitions/props'
import { StoreLogger } from '../loggers/store.logger'
import { Cache } from '../modules/cache'
import { ComponentStore } from '../modules/component.store'
import { ColorPicker } from '../pickers/color.picker'

/**
 * An abstraction for Icon stores, handles caching and parsing of raw svg element.
 *
 * @category Store
 */
export class IconStore extends ComponentStore<SVGSVGElement> {
  /** @internal */
  private _color: string = ''
  /** @internal */
  private _src: string = ''
  /**
   * A string which contains the raw svg.
   */
  svg: string
  /**
   * A number which determines the stroke thickness.
   */
  thickness: number

  constructor(props: IconProps & ComponentStoreProps<SVGSVGElement>) {
    super(ComponentName.ICON, props)

    this.color = props.color || Color.MONO
    this.size = props.size || 0
    this.svg = '<svg viewbox="0 0 0 0"></svg>'
    this.src = props.src || ''
    this.thickness = props.thickness || 0
  }

  /**
   * Picks a layered text color from color.
   */
  get color(): string {
    return ColorPicker.textByString(this._color, this.layer)
  }

  /**
   * Strips the raw svg of its parent element.
   */
  get html(): string {
    return this.svg.replace(/<svg[^<]+>/m, '').replace(/<\/svg>/m, '')
  }

  /**
   * Returns the source.
   */
  get src(): string {
    return this._src
  }

  /**
   * Finds the viewBox attribute inside the raw svg parent element.
   */
  get viewbox(): string {
    return (this.svg.match(/(viewbox|viewBox)=('|")[0-9.\s]+('|")/m) || [''])[0].slice(9, -1)
  }

  /** @internal */
  set color(value: string) {
    this._color = value
  }

  /** @internal */
  set src(src: string) {
    ;(async () => {
      switch (true) {
        case /^(https?:\/\/|\/)/.test(src):
          let cached: string | undefined, response: Response | Error, text: string | Error

          cached = Cache.icons.get(src)
          if (typeof cached === 'string') {
            if (cached.length <= 0) {
              StoreLogger.verbose(this.id, 'setSource', `Another store is fetching the same source.`)

              await new Promise<void>((r) =>
                setInterval(() => {
                  cached = Cache.icons.get(src)
                  if (cached || cached === undefined) r()
                }, 100)
              )

              if (cached === undefined) {
                StoreLogger.error(this.id, 'setSource', `The other store failed to fetch the source.`)
                return
              }
            }

            this.svg = cached
            StoreLogger.verbose(this.id, 'setSource', `The svg has been set to the cached one.`)

            break
          }

          if (Environment.isWindowNotDefined) {
            return StoreLogger.warn(this.id, 'setSource', `The window is not defined.`)
          }

          Cache.icons.set(src, '')
          StoreLogger.verbose(this.id, 'setSource', `An empty string has been cached.`)

          response = await tcp(() => window.fetch(src))
          if (response instanceof Error) return Cache.icons.delete(src)

          text = await tcp(() => (response as Response).text())
          if (text instanceof Error) return Cache.icons.delete(src)

          if (text.length <= 0) {
            Cache.icons.delete(src)
            StoreLogger.error(this.id, 'setSource', `The response text is empty.`)

            return
          }

          this.svg = text
          StoreLogger.verbose(this.id, 'setSource', `The svg has been set to the fetched text value.`)

          Cache.icons.set(src, text)
          StoreLogger.verbose(this.id, 'setSource', `The svg has been cached.`)

          break
        case /svg/.test(src):
          this.svg = src
          StoreLogger.verbose(this.id, 'setSource', `The svg has been set.`)

          break
        default:
          this.svg = '<svg viewbox="0 0 0 0"></svg>'
          StoreLogger.verbose(this.id, 'setSource', `The svg has been set to a fallback.`)

          break
      }

      this._src = src
      StoreLogger.verbose(this.id, 'setSource', `The source has been set.`)

      this.update()
    })()
  }
}
