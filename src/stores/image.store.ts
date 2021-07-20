import { Logger, NumberUtils, rv, tc, tcp } from '@queelag/core'
import { CSSProperties, SyntheticEvent } from 'react'
import { IMAGE_EMPTY_BASE64, IMAGE_EMPTY_TYPE } from '../definitions/constants'
import { ComponentName, Orientation } from '../definitions/enums'
import { ComponentShapeStoreProps } from '../definitions/interfaces'
import { ImageProps } from '../definitions/props'
import { Base64 } from '../modules/base64'
import { Cache } from '../modules/cache'
import { ComponentShapeStore } from '../modules/component.shape.store'
import { ShapeUtils } from '../utils/shape.utils'

/**
 * An abstraction for Image stores, handles caching and ratios.
 *
 * @category Store
 */
export class ImageStore extends ComponentShapeStore<HTMLImageElement> {
  /**
   * A string which contains base64 data.
   */
  base64: string
  /**
   * A boolean which determines if this image failed to load.
   */
  error: boolean
  /**
   * An {@link Orientation} used to calculate the ratio.
   */
  orientation: Orientation
  /**
   * A number which determines ratioed height or width based on the orientation.
   */
  ratio: number
  /** @internal */
  private _source: string = this.toBase64URI(IMAGE_EMPTY_BASE64, IMAGE_EMPTY_TYPE)
  /**
   * A string which determines this image mime type.
   */
  type: string

  constructor(props: ImageProps & ComponentShapeStoreProps<HTMLImageElement>) {
    super(ComponentName.IMAGE, props)

    this.base64 = IMAGE_EMPTY_BASE64
    this.error = false
    this.orientation = props.orientation || Orientation.HORIZONTAL
    this.ratio = props.ratio || 0
    this.type = IMAGE_EMPTY_TYPE
    this.source = props.source
  }

  /**
   * An event triggered by a failure whilst loading this image.
   */
  onError = (error?: SyntheticEvent<HTMLImageElement>): void => {
    this.error = true
    Logger.error(this.id, 'onError', `The error has been set to true.`, error)

    this.update()
  }

  /**
   * Returns the appropriate styles.
   */
  getStyle(props: ImageProps): CSSProperties {
    return {
      ...props.style,
      ...ShapeUtils.findStyle(this.shape, typeof props.size === 'number' ? props.size : 0),
      height: props.height || props.size || this.height || undefined,
      width: props.width || props.size || this.width || undefined
    }
  }

  /**
   * Generates a base64 URI from the base64 data and its mime type.
   */
  toBase64URI(base64: string, type: string): string {
    return 'data:' + type + ';base64,' + base64
  }

  /**
   * Returns the computed height of this image element.
   */
  get elementHeight(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.element).height)
  }

  /**
   * Returns the computed width of this image element.
   */
  get elementWidth(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.element).width)
  }

  /**
   * Returns a base64 URI.
   */
  get source(): string {
    return this._source
  }

  /**
   * Checks if this image failed to load.
   */
  get hasError(): boolean {
    return this.error === true
  }

  /**
   * Checks if this image did not fail to load.
   */
  get hasNoError(): boolean {
    return this.error === false
  }

  /**
   * Calculates a ratioed height based on this image element width if ratio is not zero.
   */
  get height(): number {
    return this.ratio > 0 ? this.elementWidth * this.ratio : 0
  }

  /**
   * Calculates a ratioed width based on this image element height if ratio is not zero.
   */
  get width(): number {
    return this.ratio > 0 ? this.elementHeight * this.ratio : 0
  }

  /** @internal */
  set source(source: string) {
    ;(async () => {
      switch (true) {
        case /^(https?:\/\/|\/)/.test(source):
          let cached: string | undefined, response: Response | Error, buffer: ArrayBuffer | Error, base64: string | Error, type: string | null

          cached = Cache.images.get(source)
          if (cached) return (this.source = cached)

          response = await tcp(() => window.fetch(source))
          if (response instanceof Error) return this.onError()

          buffer = await tcp(() => (response as Response).arrayBuffer())
          if (buffer instanceof Error) return this.onError()

          base64 = tc(() => Base64.encode(buffer as ArrayBuffer))
          if (base64 instanceof Error) return this.onError()

          type = response.headers.get('content-type')
          if (!type) return rv(() => Logger.error(this.id, 'setSource', `Failed to find the content-type header`, (response as Response).headers))

          this.base64 = base64
          this._source = this.toBase64URI(base64, type)
          this.type = type

          Cache.images.set(source, this._source)

          break
        case source.includes('base64'):
        default:
          this._source = source

          break
      }

      this.update()
    })()
  }
}

/** @category Constant */
export const IMAGE_STORE_KEYS: (keyof ImageProps & keyof ImageStore)[] = ['id', 'shape', 'source']
