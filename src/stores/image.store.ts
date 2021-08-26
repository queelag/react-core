import { Cache, ImageUtils, Logger } from '@queelag/core'
import { CSSProperties, SyntheticEvent } from 'react'
import { ComponentName, ImageStatus, Orientation } from '../definitions/enums'
import { ComponentStoreProps } from '../definitions/interfaces'
import { ImageProps } from '../definitions/props'
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
   * An {@link Orientation} used to calculate the ratio.
   */
  orientation: Orientation
  /**
   * A number which determines the quality of the cached image.
   */
  quality: number
  /**
   * A number which determines ratioed height or width based on the orientation.
   */
  ratio: number
  /**
   * An {@link ImageStatus} which determines the status of the image.
   */
  status: ImageStatus
  /** @internal */
  private _source: string = ''

  constructor(props: ImageProps & ComponentStoreProps<HTMLImageElement>) {
    super(ComponentName.IMAGE, props)

    this.alpha = props.alpha || false
    this.cache = props.cache || true
    this.orientation = props.orientation || Orientation.HORIZONTAL
    this.quality = props.quality || 0.8
    this.ratio = props.ratio || 0
    this.status = ImageStatus.IDLE
    this.source = props.source
  }

  onError = (event: SyntheticEvent<HTMLImageElement>): void => {
    this.deleteEmptyFromCache()

    this.status = ImageStatus.ERROR
    Logger.error(this.id, 'onError', `The status has been set to ${ImageStatus.ERROR}.`, event)

    this.update()
  }

  onLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (this.isCacheable) {
      Cache.images.set(this.source, ImageUtils.toBase64(this.element, this.alpha, this.quality))
      Logger.debug(this.id, 'onLoad', `The base64 value of the image has been cached.`)
    }

    this.status = ImageStatus.LOADED
    Logger.debug(this.id, 'onLoad', `The status has been set to ${ImageStatus.LOADED}.`, event)

    this.update()
  }

  onLoadStart = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (this.isCacheable) {
      Cache.images.set(this.source, '')
      Logger.debug(this.id, 'setSource', `An empty string has been cached.`)
    }
  }

  deleteEmptyFromCache(): void {
    if (this.isCacheable) {
      if ((Cache.images.get(this.source) || '').length > 0) {
        Logger.warn(this.id, 'deleteEmptyFromCache', `The cached value is not empty.`)
        return
      }

      Cache.images.delete(this.source)
      Logger.debug(this.id, 'deleteFromCache', `The empty cached value has been deleted.`)
    }
  }

  /**
   * Returns the appropriate styles.
   */
  getStyle(props: ImageProps): CSSProperties {
    return {
      ...props.style,
      ...ShapeUtils.findStyle(this.shape, typeof props.size === 'number' ? props.size : 0),
      height: props.height || props.size || props.style?.height || this.height || undefined,
      width: props.width || props.size || props.style?.width || this.width || undefined
    }
  }

  /**
   * Calculates a ratioed height based on this image element width if ratio is not zero.
   */
  get height(): number {
    return this.isOrientationVertical ? (this.ratio > 0 ? this.elementComputedWidth * this.ratio : 0) : 0
  }

  /**
   * Returns a base64 URI.
   */
  get source(): string {
    return this._source
  }

  /**
   * Calculates a ratioed width based on this image element height if ratio is not zero.
   */
  get width(): number {
    return this.isOrientationHorizontal ? (this.ratio > 0 ? this.elementComputedHeight * this.ratio : 0) : 0
  }

  get isCacheable(): boolean {
    return this.cache === true
  }

  get isNotCacheable(): boolean {
    return this.cache === false
  }

  get isFallbackVisible(): boolean {
    return this.isStatusError || this.isStatusLoading
  }

  get isStatusError(): boolean {
    return this.status === ImageStatus.ERROR
  }

  get isStatusLoaded(): boolean {
    return this.status == ImageStatus.LOADED
  }

  get isStatusLoading(): boolean {
    return this.status === ImageStatus.LOADING
  }

  /** @internal */
  set source(source: string) {
    ;(async () => {
      let cached: string | undefined

      cached = Cache.images.get(source)
      if (typeof cached === 'string') {
        if (cached.length <= 0) {
          Logger.debug(this.id, 'setSource', `Another store is loading the same source.`)
          await new Promise<void>((r) =>
            setInterval(() => {
              cached = Cache.images.get(source)
              if (cached || cached === undefined) r()
            }, 100)
          )

          if (cached === undefined) {
            this.status = ImageStatus.ERROR
            Logger.debug(this.id, 'setSource', `The other store failed to fetch the source, the status has been set to ${this.status}.`)

            return
          }
        }

        this._source = cached
        Logger.debug(this.id, 'setSource', `The source has been set to the cached one.`)

        this.status = ImageStatus.LOADED
        Logger.debug(this.id, 'setSource', `The status has been set to ${this.status}.`)

        this.update()

        return
      }

      this._source = source
      Logger.debug(this.id, 'setSource', `The source has been set.`)

      this.status = ImageStatus.LOADING
      Logger.debug(this.id, 'setSource', `The status has been set to ${this.status}.`)

      this.update()
    })()
  }
}
