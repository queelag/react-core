import { Logger } from '@queelag/core'
import { Cache } from '../modules/cache'

export class ImageUtils {
  static toBase64(image: HTMLImageElement, alpha: boolean = false, quality: number = 0.8): string {
    let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, base64: string

    canvas = document.createElement('canvas')
    context = canvas.getContext('2d') || new CanvasRenderingContext2D()

    canvas.height = image.naturalHeight
    canvas.width = image.naturalWidth
    context.drawImage(image, 0, 0)

    return canvas.toDataURL(alpha ? 'image/png' : 'image/jpeg', quality)
  }

  static async preload(sources: string[]): Promise<boolean> {
    let loads: boolean[]

    loads = await Promise.all(
      sources
        .filter((v: string) => !Cache.images.has(v))
        .map(
          (v: string) =>
            new Promise<boolean>((resolve) => {
              let element: HTMLImageElement

              element = document.createElement('img')
              element.crossOrigin = 'anonymous'
              element.src = v
              // element.style.height = 'auto'
              // element.style.left = '0px'
              element.style.opacity = '0'
              element.style.pointerEvents = 'none'
              element.style.position = 'absolute'
              // element.style.top = '0px'
              // element.style.width = 'auto'

              element.onerror = (event: string | Event) => {
                element.remove()
                Logger.error('ImageUtils', 'preload', `The image with source ${v} failed to load.`, event)

                resolve(false)
              }
              element.onload = () => {
                Cache.images.set(v, this.toBase64(element))

                element.remove()
                Logger.debug('ImageUtils', 'preload', `The image with source ${v} has been cached and loaded.`)

                resolve(true)
              }

              document.body.appendChild(element)
            })
        )
    )

    return loads.every((v: boolean) => v)
  }
}
