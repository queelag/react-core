import { Color, FeedbackType, Layer } from '../definitions/enums'
import { ColorPickerConfiguration } from '../definitions/types'
import { Dummy } from '../modules/dummy'

/**
 * @category Picker
 */
export class ColorPicker {
  static configuration: ColorPickerConfiguration = Dummy.colorPickerConfiguration

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

  static backgroundByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.background(this.byFeedbackType(type), layer)
  }

  static backgroundByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.background(color as Color, layer) : color
  }

  static borderByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.border(this.byFeedbackType(type), layer)
  }

  static borderByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.border(color as Color, layer) : color
  }

  static divideByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.divide(this.byFeedbackType(type), layer)
  }

  static divideByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.divide(color as Color, layer) : color
  }

  static textByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.text(this.byFeedbackType(type), layer)
  }

  static textByString(color: string, layer?: Layer): string {
    return Object.keys(Color).includes(color) ? this.text(color as Color, layer) : color
  }

  static background(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.background.gray[0]
          case Layer.ONE:
            return this.configuration.background.gray[1]
          case Layer.TWO:
            return this.configuration.background.gray[2]
          case Layer.THREE:
            return this.configuration.background.gray[3]
        }
      case Color.MONO:
        return this.configuration.background.mono
      case Color.MONO_INVERTED:
        return this.configuration.background.monoInverted
      default:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.background.any(color)[0]
          case Layer.ONE:
            return this.configuration.background.any(color)[1]
          case Layer.TWO:
            return this.configuration.background.any(color)[2]
          case Layer.THREE:
            return this.configuration.background.any(color)[3]
        }
    }
  }

  static border(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.border.gray[0]
          case Layer.ONE:
            return this.configuration.border.gray[1]
          case Layer.TWO:
            return this.configuration.border.gray[2]
          case Layer.THREE:
            return this.configuration.border.gray[3]
        }
      case Color.MONO:
        return this.configuration.border.mono
      case Color.MONO_INVERTED:
        return this.configuration.border.monoInverted
      default:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.border.any(color)[0]
          case Layer.ONE:
            return this.configuration.border.any(color)[1]
          case Layer.TWO:
            return this.configuration.border.any(color)[2]
          case Layer.THREE:
            return this.configuration.border.any(color)[3]
        }
    }
  }

  static divide(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.divide.gray[0]
          case Layer.ONE:
            return this.configuration.divide.gray[1]
          case Layer.TWO:
            return this.configuration.divide.gray[2]
          case Layer.THREE:
            return this.configuration.divide.gray[3]
        }
      case Color.MONO:
        return this.configuration.divide.mono
      case Color.MONO_INVERTED:
        return this.configuration.divide.monoInverted
      default:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.divide.any(color)[0]
          case Layer.ONE:
            return this.configuration.divide.any(color)[1]
          case Layer.TWO:
            return this.configuration.divide.any(color)[2]
          case Layer.THREE:
            return this.configuration.divide.any(color)[3]
        }
    }
  }

  static text(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.text.gray[0]
          case Layer.ONE:
            return this.configuration.text.gray[1]
          case Layer.TWO:
            return this.configuration.text.gray[2]
          case Layer.THREE:
            return this.configuration.text.gray[3]
        }
      case Color.MONO:
        return this.configuration.background.mono
      case Color.MONO_INVERTED:
        return this.configuration.background.monoInverted
      default:
        switch (layer) {
          case Layer.ZERO:
            return this.configuration.text.any(color)[0]
          case Layer.ONE:
            return this.configuration.text.any(color)[1]
          case Layer.TWO:
            return this.configuration.text.any(color)[2]
          case Layer.THREE:
            return this.configuration.text.any(color)[3]
        }
    }
  }

  static inverted(color: Color): Color {
    switch (color) {
      case Color.MONO:
        return Color.MONO_INVERTED
      default:
        return color
    }
  }
}
