import { ID } from '@queelag/core'
import { CSSProperties } from 'react'
import { Shape } from '../definitions/enums'
import { Squircle } from '../modules/squircle'

/**
 * Utils for anything related to shapes.
 *
 * @category Utility
 */
export class ShapeUtils {
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

        cached = Squircle.cache.get(Squircle.toCacheKey(curvature, size))
        if (cached) return { clipPath: `url(#${cached})` }

        svg = Squircle.create(size, curvature)
        clip = svg.querySelector('clipPath') as SVGClipPathElement

        Squircle.cache.set(Squircle.toCacheKey(curvature, size), clip.id)
        Squircle.container.appendChild(svg)

        return { clipPath: `url(#${clip.id})` }
    }
  }
}
