import { Logger } from '@queelag/core'
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
   * An {@link Orientation} used to calculate the ratio.
   */
  orientation: Orientation
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

    this.orientation = props.orientation || Orientation.HORIZONTAL
    this.ratio = props.ratio || 0
    this.status = ImageStatus.LOADING
    this.source = props.source
  }

  /**
   * An event triggered by a failure whilst loading this image.
   */
  onError = (event?: SyntheticEvent<HTMLImageElement>): void => {
    this.status = ImageStatus.ERROR
    Logger.error(this.id, 'onError', `The status has been set to ${ImageStatus.ERROR}.`, event)

    this.update()
  }

  onLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
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
    this.status = ImageStatus.LOADING
    this.update()
  }
}

/** @category Constant */
export const IMAGE_STORE_KEYS: (keyof ImageProps & keyof ImageStore)[] = ['id', 'shape', 'source']
