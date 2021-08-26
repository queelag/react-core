import { Environment, Logger, tcp } from '@queelag/core'
import { Color, ComponentName } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { IconProps } from '../definitions/props'
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
  private _source: string = ''
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
    this.source = props.source || ''
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
  get source(): string {
    return this._source
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
  set source(source: string) {
    ;(async () => {
      switch (true) {
        case /^(https?:\/\/|\/)/.test(source):
          let cached: string | undefined, response: Response | Error, text: string | Error

          cached = Cache.icons.get(source)
          if (typeof cached === 'string') {
            if (cached.length <= 0) {
              Logger.debug(this.id, 'setSource', `Another store is fetching the same source.`)
              await new Promise<void>((r) => setInterval(() => (Cache.icons.get(source) || Cache.icons.get(source) === undefined) && r(), 100))

              if (cached === undefined) {
                Logger.debug(this.id, 'setSource', `The other store failed to fetch the source.`)
                return
              }
            }

            this._source = cached
            Logger.debug(this.id, 'setSource', `The source has been set to the cached one.`)

            this.update()

            return
          }

          if (Environment.isWindowNotDefined) {
            return Logger.warn(this.id, 'setSource', `The window is not defined.`)
          }

          Cache.icons.set(source, '')
          Logger.debug(this.id, 'setSource', `An empty string has been cached.`)

          response = await tcp(() => window.fetch(source))
          if (response instanceof Error) return Cache.icons.delete(source)

          text = await tcp(() => (response as Response).text())
          if (text instanceof Error) return Cache.icons.delete(source)

          if (text.length <= 0) {
            Cache.icons.delete(source)
            Logger.debug(this.id, 'setSource', `The response text is empty.`)

            return
          }

          this.svg = text
          Logger.debug(this.id, 'setSource', `The svg has been set to the fetched text value.`)

          Cache.icons.set(source, text)
          Logger.debug(this.id, 'setSource', `The svg has been cached.`)

          break
        case /svg/.test(source):
          this.svg = source
          Logger.debug(this.id, 'setSource', `The svg has been set.`)

          break
        default:
          this.svg = '<svg viewbox="0 0 0 0"></svg>'
          Logger.debug(this.id, 'setSource', `The svg has been set to a fallback.`)

          break
      }

      this._source = source
      Logger.debug(this.id, 'setSource', `The source has been set.`)

      this.update()
    })()
  }
}
