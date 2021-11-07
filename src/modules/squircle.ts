import { ID, IDUtils } from '@queelag/core'
import { ComponentName } from '../definitions/enums'

/**
 * An abstraction for squircles.
 *
 * @category Module
 */
export class Squircle {
  static cache: Map<string, ID> = new Map()

  static create(size: number, curvature: number = 0.75): SVGSVGElement {
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

  static toCacheKey(curvature: number, size: number): string {
    return [curvature, size].join(',')
  }

  static get container(): HTMLDivElement {
    let element: HTMLDivElement

    element = document.querySelector('#' + this.containerID) || document.createElement('div')
    if (element.id) return element

    element.id = this.containerID
    element.style.opacity = '0'
    element.style.pointerEvents = 'none'
    element.style.position = 'absolute'

    return document.body.appendChild(element)
  }

  /** @internal */
  private static get containerID(): string {
    return 'SQUIRCLES_CONTAINER'
  }
}
