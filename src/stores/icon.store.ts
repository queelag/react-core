import { tcp } from '@queelag/core'
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
export class IconStore extends ComponentStore<SVGElement> {
  /** @internal */
  private _color: string = ''
  /**
   * A number which determines height and width.
   */
  size: number
  /** @internal */
  private _svg: string = ''
  /**
   * A number which determines the stroke thickness.
   */
  thickness: number

  constructor(props: IconProps & ComponentStoreProps<SVGElement>) {
    super(ComponentName.ICON, props)

    this.color = props.color || Color.MONO
    this.size = props.size || 0
    this.svg = props.svg || ''
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
   * Returns the raw svg.
   */
  get svg(): string {
    return this._svg
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
  set svg(svg: string) {
    ;(async () => {
      switch (true) {
        case /^(https?:\/\/|\/)/.test(svg):
          let cached: string | undefined, response: Response | Error, text: string | Error

          cached = Cache.icons.get(svg)
          if (cached) {
            this.svg = cached
            return
          }

          response = await tcp(() => window.fetch(svg))
          if (response instanceof Error) return

          text = await tcp(() => (response as Response).text())
          if (text instanceof Error) return

          this._svg = svg
          Cache.icons.set(svg, text)

          break
        case svg.includes('svg'):
          this._svg = svg
          break
        default:
          this._svg = '<svg viewbox="0 0 0 0"></svg>'
          break
      }

      this.update()
    })()
  }
}

/** @category Constant */
export const ICON_STORE_KEYS: (keyof IconProps & keyof IconStore)[] = ['color', 'id', 'layer', 'size', 'svg', 'thickness']
