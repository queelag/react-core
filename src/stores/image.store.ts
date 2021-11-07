import { Cache, ImageUtils } from '@queelag/core'
import { CSSProperties, SyntheticEvent } from 'react'
import { ComponentName, ImageStatus } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ImageProps } from '../definitions/props'
import { StoreLogger } from '../loggers/store.logger'
import { ComponentStore } from '../modules/component.store'
import { ShapeUtils } from '../utils/shape.utils'

/**
 * An abstraction for Image stores, handles caching and ratios.
 *
 * @category Store
 */
export class ImageStore extends ComponentStore<HTMLImageElement> {
  /**
   * A boolean which determines the type of the cached image.
   */
  alpha: boolean
  /**
   * A boolean which determines if this image will be cached or not.
   */
  cache: boolean
  /**
   * A number which determines the quality of the cached image.
   */
  quality: number
  /**
   * An {@link ImageStatus} which determines the status of the image.
   */
  status: ImageStatus
  /** @internal */
  private _src: string = ''

  constructor(props: ImageProps & ComponentStoreProps<HTMLImageElement>) {
    super(ComponentName.IMAGE, props)

    this.alpha = props.alpha || false
    this.cache = props.cache || false
    this.quality = props.quality || 0.8
    this.status = ImageStatus.IDLE
    this.src = props.src || ''
  }

  onError = (event: SyntheticEvent<HTMLImageElement>): void => {
    this.deleteEmptyFromCache()

    this.status = ImageStatus.ERROR
    StoreLogger.error(this.id, 'onError', `The status has been set to ${ImageStatus.ERROR}.`, event)

    this.update()
  }

  onLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (this.isCacheable && this.isNotCached) {
      Cache.images.set(this.src, ImageUtils.toBase64(this.element, this.alpha, this.quality))
      StoreLogger.verbose(this.id, 'onLoad', `The base64 value of the image has been cached.`)
    }

    this.status = ImageStatus.LOADED
    StoreLogger.verbose(this.id, 'onLoad', `The status has been set to ${ImageStatus.LOADED}.`, event)

    this.update()
  }

  onLoadStart = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (this.isCacheable && this.isNotCached) {
      Cache.images.set(this.src, '')
      StoreLogger.verbose(this.id, 'setSource', `An empty string has been cached.`)
    }
  }

  deleteEmptyFromCache(): void {
    if (this.isCacheable) {
      if (this.isCached) {
        StoreLogger.warn(this.id, 'deleteEmptyFromCache', `The cached value is not empty.`)
        return
      }

      Cache.images.delete(this.src)
      StoreLogger.verbose(this.id, 'deleteFromCache', `The empty cached value has been deleted.`)
    }
  }

  /**
   * Returns the appropriate styles.
   */
  getStyle(props: ImageProps): CSSProperties {
    return {
      ...props.style,
      ...ShapeUtils.findStyle(this.shape, typeof props.size === 'number' ? props.size : 0),
      height: props.height || props.size || props.style?.height || undefined,
      width: props.width || props.size || props.style?.width || undefined
    }
  }

  /**
   * Returns a base64 URI.
   */
  get src(): string {
    return this._src
  }

  get isCacheable(): boolean {
    return this.cache === true
  }

  get isNotCacheable(): boolean {
    return this.cache === false
  }

  get isCached(): boolean {
    return (Cache.images.get(this.src) || '').length > 0
  }

  get isNotCached(): boolean {
    return !this.isCached
  }

  get isFallbackVisible(): boolean {
    return this.isStatusIdle || this.isStatusError || this.isStatusLoading
  }

  get isStatusError(): boolean {
    return this.status === ImageStatus.ERROR
  }

  get isStatusIdle(): boolean {
    return this.status === ImageStatus.IDLE
  }

  get isStatusLoaded(): boolean {
    return this.status == ImageStatus.LOADED
  }

  get isStatusLoading(): boolean {
    return this.status === ImageStatus.LOADING
  }

  /** @internal */
  set src(src: string) {
    ;(async () => {
      let cached: string | undefined

      cached = Cache.images.get(src)
      if (typeof cached === 'string') {
        if (cached.length <= 0) {
          StoreLogger.verbose(this.id, 'setSource', `Another store is loading the same source.`)

          await new Promise<void>((r) =>
            setInterval(() => {
              cached = Cache.images.get(src)
              if (cached || cached === undefined) r()
            }, 100)
          )

          if (cached === undefined) {
            this.status = ImageStatus.ERROR
            StoreLogger.error(this.id, 'setSource', `The other store failed to fetch the source, the status has been set to ${this.status}.`)

            return
          }
        }

        this._src = cached
        StoreLogger.verbose(this.id, 'setSource', `The source has been set to the cached one.`)

        this.status = ImageStatus.LOADED
        StoreLogger.verbose(this.id, 'setSource', `The status has been set to ${this.status}.`)

        this.update()

        return
      }

      this._src = src
      StoreLogger.verbose(this.id, 'setSource', `The source has been set.`)

      this.status = ImageStatus.LOADING
      StoreLogger.verbose(this.id, 'setSource', `The status has been set to ${this.status}.`)

      this.update()
    })()
  }
}
