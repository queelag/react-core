import { ID, IDUtils } from '@queelag/core'
import { CSSProperties } from 'react'
import { ComponentName, Shape } from '../definitions/enums'

/**
 * Utils for anything related to shapes.
 *
 * @category Utility
 */
export class ShapeUtils {
  /** @internal */
  private static squircleCache: Map<string, ID> = new Map()

  static createSquircle(size: number, curvature: number = 0.75): SVGSVGElement {
    let arc: number, path: SVGPathElement, clip: SVGClipPathElement, svg: SVGSVGElement

    arc = Math.min(size / 2, size / 2) * (1 - curvature)

    path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute(
      'd',
      `
        M 0 ${size / 2}
        C 0 ${arc}, ${arc} 0, ${size / 2} 0
        S ${size} ${arc}, ${size} ${size / 2}, ${size - arc} ${size}
          ${size / 2} ${size}, 0 ${size - arc}, 0 ${size / 2}
      `
    )
    path.setAttribute(
      'transform',
      `
        rotate(
            ${0},
            ${size / 2},
            ${size / 2}
        )
        translate(
            ${(size - size) / 2},
            ${(size - size) / 2}
        )
      `
    )

    clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
    clip.setAttribute('id', IDUtils.prefixed(ComponentName.SQUIRCLE))
    clip.appendChild(path)

    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('fill', 'black')
    svg.setAttribute('version', '1.1')
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`)
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.appendChild(clip)

    return svg
  }

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
        let cached: ID | undefined, svg: SVGSVGElement, clip: SVGClipPathElement

        cached = this.squircleCache.get(this.toSquircleCacheKey(curvature, size))
        if (cached) return { clipPath: `url(#${cached})` }

        svg = this.createSquircle(size, curvature)
        clip = svg.querySelector('clipPath') as SVGClipPathElement

        this.squircleCache.set(this.toSquircleCacheKey(curvature, size), clip.id)
        this.squirclesContainer.appendChild(svg)

        return { clipPath: `url(#${clip.id})` }
    }
  }

  /** @internal */
  private static toSquircleCacheKey(curvature: number, size: number): string {
    return [curvature, size].join(',')
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
