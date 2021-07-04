import { ID, noop, tcp } from '@queelag/core'
import { Color, ComponentName, Layer } from '../definitions/enums'
import { IconProps } from '../definitions/props'
import Cache from '../modules/cache'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { ColorPicker } from '../pickers/color.picker'

export class IconStore extends ComponentLayerStore<SVGElement> {
  mounted: boolean
  size: number
  thickness: number

  private _color: string = ''
  private _svg: string = ''

  constructor(
    color: string = Color.MONO,
    id: ID = '',
    layer: Layer = Layer.ZERO,
    size: number = 16,
    svg: string = '',
    thickness: number = 2,
    update: () => void = noop
  ) {
    super(ComponentName.ICON, id, layer, undefined, update)

    this.color = color
    this.mounted = true
    this.size = size
    this.svg = svg
    this.thickness = thickness
  }

  get color(): string {
    return ColorPicker.textByString(this._color, this.layer)
  }

  get html(): string {
    return this.svg.replace(/<svg[^<]+>/m, '').replace(/<\/svg>/m, '')
  }

  get svg(): string {
    return this._svg
  }

  get viewbox(): string {
    return (this.svg.match(/(viewbox|viewBox)=('|")[0-9.\s]+('|")/m) || [''])[0].slice(9, -1)
  }

  set color(value: string) {
    this._color = value
  }

  set svg(svg: string) {
    ;(async () => {
      switch (true) {
        case Boolean(false):
          // case Schema.isValid(Joi.string().uri({ allowRelative: true }), svg):
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

export const ICON_STORE_KEYS: (keyof IconProps & keyof IconStore)[] = ['color', 'id', 'layer', 'size', 'svg', 'thickness']
