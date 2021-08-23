import { Cache, ImageUtils, Logger } from '@queelag/core'
import { CSSProperties, SyntheticEvent } from 'react'
import { IMAGE_EMPTY_BASE64 } from '../definitions/constants'
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
  private _source: string = IMAGE_EMPTY_BASE64

  constructor(props: ImageProps & ComponentStoreProps<HTMLImageElement>) {
    super(ComponentName.IMAGE, props)

    this.alpha = props.alpha || false
    this.cache = typeof props.cache === 'boolean' ? props.cache : true
    this.orientation = props.orientation || Orientation.HORIZONTAL
    this.quality = props.quality || 0.8
    this.ratio = props.ratio || 0
    this.status = ImageStatus.LOADING
    this.source = props.source
  }

  onError = (event?: SyntheticEvent<HTMLImageElement>): void => {
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
    let cached: string | undefined

    cached = Cache.images.get(source)
    if (!cached) {
      this._source = source
      Logger.debug(this.id, 'setSource', `The source has been set.`)

      this.status = ImageStatus.LOADING
      Logger.debug(this.id, 'setSource', `The status has been set to ${this.status}.`)

      this.update()

      return
    }

    this._source = cached as string
    Logger.debug(this.id, 'setSource', `The source has been set to the cached one.`)

    this.status = ImageStatus.LOADED
    Logger.debug(this.id, 'setSource', `The status has been set to ${this.status}.`)

    this.update()
  }
}
