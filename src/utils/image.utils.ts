import { Logger } from '@queelag/core'

export class ImageUtils {
  static async preload(sources: string[]): Promise<boolean> {
    let loads: boolean[]

    loads = await Promise.all(
      sources.map(
        (v: string) =>
          new Promise<boolean>((resolve) => {
            let element: HTMLImageElement

            element = document.createElement('img')
            element.src = v
            element.style.height = '0px'
            element.style.left = '0px'
            element.style.opacity = '0'
            element.style.pointerEvents = 'none'
            element.style.position = 'absolute'
            element.style.top = '0px'
            element.style.width = '0px'

            element.onerror = (event: string | Event) => {
              element.remove()
              Logger.error('ImageUtils', 'preload', `The image with source ${v} failed to load.`, event)

              resolve(false)
            }
            element.onload = () => {
              element.remove()
              Logger.debug('ImageUtils', 'preload', `The image with source ${v} has been loaded.`)

              resolve(true)
            }

            document.body.appendChild(element)
          })
      )
    )

    return loads.every((v: boolean) => v)
  }
}
