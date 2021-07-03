import { ID, IDUtils, tc } from '@queelag/core'
import { CSSProperties } from 'react'
// @ts-ignore
import { createSquircle } from 'squircleyjs'
import { ComponentName, Shape } from '../definitions/enums'

export class ShapeUtils {
  private static squircleCache: Map<string, ID> = new Map()

  static findStyle(shape: Shape, size: number, curvature: number = 0.75): CSSProperties {
    switch (shape) {
      case Shape.CIRCLE:
        return { borderRadius: 9999 }
      case Shape.NONE:
      case Shape.RECTANGLE:
      case Shape.SQUARE:
        return {}
      case Shape.SQUIRCLE:
        let potential: string | undefined, svg: SVGElement | Error, id: string

        potential = this.squircleCache.get(this.toSquircleCacheKey(size, curvature))
        if (potential) return { clipPath: `url(#${potential})` }

        svg = tc(() =>
          createSquircle({
            format: 'SVGNode',
            viewBox: [0, 0, size, size],
            width: size,
            height: size,
            curvature: curvature,
            fill: '#000',
            rotate: 0
          })
        )
        if (svg instanceof Error) return {}

        id = IDUtils.prefixed(ComponentName.SQUIRCLE)
        svg.innerHTML = `<clipPath id='${id}'>${svg.innerHTML}</clipPath>`

        this.squircleCache.set(this.toSquircleCacheKey(size, curvature), id)
        this.squirclesContainer.appendChild(svg)

        return { clipPath: `url(#${id})` }
    }
  }

  private static toSquircleCacheKey(size: number, curvature: number): string {
    return [size, curvature].join(',')
  }

  private static get squirclesContainer(): HTMLDivElement {
    let element: HTMLDivElement

    element = document.querySelector('#' + this.squirclesContainerID) || document.createElement('div')
    if (element.id) return element

    element.id = this.squirclesContainerID
    element.style.opacity = '0'
    element.style.pointerEvents = 'none'
    element.style.position = 'absolute'

    return document.body.appendChild(element)
  }

  private static get squirclesContainerID(): string {
    return 'SQUIRCLES_CONTAINER'
  }
}
