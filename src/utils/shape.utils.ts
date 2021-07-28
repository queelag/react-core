import { ID } from '@queelag/core'
import { CSSProperties } from 'react'
// @ts-ignore
// import { createSquircle } from 'squircleyjs'
import { Shape } from '../definitions/enums'

/**
 * Utils for anything related to shapes.
 *
 * @category Utility
 */
export class ShapeUtils {
  /** @internal */
  private static squircleCache: Map<string, ID> = new Map()

  /**
   * Returns the appropriate styles for shape, size and curvature.
   */
  static findStyle(shape: Shape, size: number = 0, curvature: number = 0.75): CSSProperties {
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

        id = ''

        // svg = tc(() =>
        //   createSquircle({
        //     format: 'SVGNode',
        //     viewBox: [0, 0, size, size],
        //     width: size,
        //     height: size,
        //     curvature: curvature,
        //     fill: '#000',
        //     rotate: 0
        //   })
        // )
        // if (svg instanceof Error) return {}

        // id = IDUtils.prefixed(ComponentName.SQUIRCLE)
        // svg.innerHTML = `<clipPath id='${id}'>${svg.innerHTML}</clipPath>`

        // this.squircleCache.set(this.toSquircleCacheKey(size, curvature), id)
        // this.squirclesContainer.appendChild(svg)

        return { clipPath: `url(#${id})` }
    }
  }

  /** @internal */
  private static toSquircleCacheKey(size: number, curvature: number): string {
    return [size, curvature].join(',')
  }

  /** @internal */
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

  /** @internal */
  private static get squirclesContainerID(): string {
    return 'SQUIRCLES_CONTAINER'
  }
}
