import { ID, noop, tcp } from '@queelag/core'
import Joi from 'joi'
import { MutableRefObject } from 'react'
import { Color, ComponentName, Layer } from '../definitions/enums'
import Cache from '../modules/cache'
import { ComponentLayerStore } from '../modules/component.layer.store'
import { Schema } from '../modules/schema'
import ColorPicker from '../pickers/color.picker'

export class IconStore extends ComponentLayerStore<SVGElement> {
  html: string
  mounted: boolean
  size: number
  svg: string
  thickness: number
  updateSVGPromise: Promise<void>
  viewbox: string

  private _color: string

  constructor(
    color: string = Color.MONO,
    id: ID,
    layer: Layer = Layer.ZERO,
    ref: MutableRefObject<SVGElement>,
    size: number = 16,
    svg: string = '',
    thickness: number = 2,
    update: () => void = noop
  ) {
    super(ComponentName.ICON, id, layer, ref, update)

    this.html = ''
    this.mounted = true
    this.size = size
    this.svg = svg
    this.thickness = thickness
    this.viewbox = '0 0 0 0'
    this.updateSVGPromise = this.updateSVG(svg, noop)

    this._color = color
  }

  async updateSVG(svg: string = this.svg, update: () => void): Promise<void> {
    switch (true) {
      case Schema.isValid(Joi.string().uri({ allowRelative: true }), svg):
        let cached: string | undefined, response: Response | Error, text: string | Error

        cached = Cache.icons.get(svg)
        if (cached) return this.updateSVG(cached, update)

        response = await tcp(() => window.fetch(svg))
        if (response instanceof Error) return

        text = await tcp(() => (response as Response).text())
        if (text instanceof Error) return

        this.svg = svg
        this.html = this.findSVGContent(text)
        this.viewbox = this.findViewBoxBySVG(text)

        Cache.icons.set(svg, text)

        break
      case svg.includes('svg'):
        this.svg = svg
        this.html = this.findSVGContent(this.svg)
        this.viewbox = this.findViewBoxBySVG(this.svg)

        break
      default:
        this.svg = '<svg></svg>'
        this.html = ''
        this.viewbox = '0 0 0 0'

        break
    }

    update()
  }

  findSVGContent(svg: string): string {
    return svg.replace(/<svg[^<]+>/m, '').replace(/<\/svg>/m, '')
  }

  findViewBoxBySVG(svg: string): string {
    return (svg.match(/(viewbox|viewBox)=('|")[0-9.\s]+('|")/m) || [''])[0].slice(9, -1)
  }

  get color(): string {
    return ColorPicker.textByString(this._color, this.layer)
  }

  set color(value: string) {
    this._color = value
  }
}
