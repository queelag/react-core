import { Color, FeedbackType, Layer } from '../definitions/enums'
import { ColorPickerConfiguration } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

/**
 * Picks layered background, border, divide and text colors from a configuration, also supports color based on the {@link FeedbackType}.
 *
 * @category Picker
 */
export class ColorPicker {
  /**
   * A {@link ColorPickerConfiguration} which determines the colors that will be used.
   */
  static configuration: ColorPickerConfiguration = Dummy.colorPickerConfiguration

  /**
   * Picks a layered color from a {@link FeedbackType}.
   */
  static byFeedbackType(type: FeedbackType): Color {
    switch (type) {
      case FeedbackType.ERROR:
        return this.configuration.feedback.error
      case FeedbackType.INFORMATION:
        return this.configuration.feedback.information
      case FeedbackType.SUCCESS:
        return this.configuration.feedback.success
      case FeedbackType.WARNING:
        return this.configuration.feedback.warning
    }
  }

  /**
   * Picks a layered background color from a {@link FeedbackType}
   */
  static backgroundByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.background(this.byFeedbackType(type), layer)
  }

  /**
   * Picks a layered background color from a string
   */
  static backgroundByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.background(color as Color, layer) : color
  }

  /**
   * Picks a layered border color from a {@link FeedbackType}
   */
  static borderByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.border(this.byFeedbackType(type), layer)
  }

  /**
   * Picks a layered border color from a string
   */
  static borderByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.border(color as Color, layer) : color
  }

  /**
   * Picks a layered divide color from a {@link FeedbackType}
   */
  static divideByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.divide(this.byFeedbackType(type), layer)
  }

  /**
   * Picks a layered divide color from a string
   */
  static divideByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.divide(color as Color, layer) : color
  }

  /**
   * Picks a layered text color from a {@link FeedbackType}
   */
  static textByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.text(this.byFeedbackType(type), layer)
  }

  /**
   * Picks a layered text color from a string
   */
  static textByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.text(color as Color, layer) : color
  }

  /**
   * Picks a layered background color.
   */
  static background(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        return this.configuration.background.gray[layer]
      case Color.MONO:
        return this.configuration.background.mono
      case Color.MONO_INVERTED:
        return this.configuration.background.monoInverted
      default:
        return this.configuration.background.any(color)[layer]
    }
  }

  /**
   * Picks a layered border color.
   */
  static border(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        return this.configuration.border.gray[layer]
      case Color.MONO:
        return this.configuration.border.mono
      case Color.MONO_INVERTED:
        return this.configuration.border.monoInverted
      default:
        return this.configuration.border.any(color)[layer]
    }
  }

  /**
   * Picks a layered divide color.
   */
  static divide(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        return this.configuration.divide.gray[layer]
      case Color.MONO:
        return this.configuration.divide.mono
      case Color.MONO_INVERTED:
        return this.configuration.divide.monoInverted
      default:
        return this.configuration.divide.any(color)[layer]
    }
  }

  /**
   * Picks a layered text color.
   */
  static text(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        return this.configuration.text.gray[layer]
      case Color.MONO:
        return this.configuration.background.mono
      case Color.MONO_INVERTED:
        return this.configuration.background.monoInverted
      default:
        return this.configuration.text.any(color)[layer]
    }
  }

  /**
   * Picks an inverted of color.
   */
  static inverted(color: Color): Color {
    switch (color) {
      case Color.MONO:
        return Color.MONO_INVERTED
      default:
        return color
    }
  }
}
