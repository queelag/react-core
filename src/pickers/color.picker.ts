import { Color, FeedbackType, Layer } from '../definitions/enums'

class ColorPicker {
  static byFeedbackType(type: FeedbackType): Color {
    switch (type) {
      case FeedbackType.ERROR:
        return Color.RED
      case FeedbackType.INFORMATION:
        return Color.BLUE
      case FeedbackType.SUCCESS:
        return Color.GREEN
      case FeedbackType.WARNING:
        return Color.YELLOW
      default:
        return Color.GRAY
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

  static divideByFeedbackType(type: FeedbackType, layer?: Layer): string {
    return this.divide(this.byFeedbackType(type), layer)
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
            return 'bg-gray-100 dark:bg-black'
          case Layer.ONE:
            return 'bg-white dark:bg-gray-900'
          case Layer.TWO:
            return 'bg-gray-100 dark:bg-gray-800'
          case Layer.THREE:
            return 'bg-gray-200 dark:bg-gray-700'
        }
      case Color.MONO:
        return 'bg-white dark:bg-black'
      case Color.MONO_INVERTED:
        return 'bg-black dark:bg-white'
      default:
        switch (layer) {
          case Layer.ZERO:
            return `bg-${color.toLowerCase()}-100`
          case Layer.ONE:
            return `bg-${color.toLowerCase()}-200`
          case Layer.TWO:
            return `bg-${color.toLowerCase()}-300`
          case Layer.THREE:
            return `bg-${color.toLowerCase()}-400`
        }
    }
  }

  static border(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return 'border-white dark:border-gray-900'
          case Layer.ONE:
            return 'border-gray-100 dark:border-gray-800'
          case Layer.TWO:
            return 'border-gray-200 dark:border-gray-700'
          case Layer.THREE:
            return 'border-gray-300 dark:border-gray-600'
        }
      case Color.MONO:
        return 'border-black dark:border-white'
      case Color.MONO_INVERTED:
        return 'border-white dark:border-black'
      default:
        return `border-${color.toLowerCase()}-600`
    }
  }

  static divide(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return 'divide-white dark:divide-gray-900'
          case Layer.ONE:
            return 'divide-gray-100 dark:divide-gray-800'
          case Layer.TWO:
            return 'divide-gray-200 dark:divide-gray-700'
          case Layer.THREE:
            return 'divide-gray-300 dark:divide-gray-600'
        }
      case Color.MONO:
        return 'divide-black dark:divide-white'
      case Color.MONO_INVERTED:
        return 'divide-white dark:divide-black'
      default:
        return `divide-${color.toLowerCase()}-600`
    }
  }

  static text(color: Color = Color.MONO, layer: Layer = Layer.ZERO): string {
    switch (color) {
      case Color.GRAY:
        switch (layer) {
          case Layer.ZERO:
            return 'text-gray-500 dark:text-gray-300'
          case Layer.ONE:
            return 'text-gray-400 dark:text-gray-400'
          case Layer.TWO:
            return 'text-gray-500 dark:text-gray-500'
          case Layer.THREE:
            return 'text-gray-600 dark:text-gray-600'
        }
      case Color.MONO:
        return 'text-black dark:text-white'
      case Color.MONO_INVERTED:
        return 'text-white dark:text-black'
      default:
        switch (layer) {
          case Layer.ZERO:
            return `text-${color.toLowerCase()}-600`
          case Layer.ONE:
            return `text-${color.toLowerCase()}-700`
          case Layer.TWO:
            return `text-${color.toLowerCase()}-800`
          case Layer.THREE:
            return `text-${color.toLowerCase()}-900`
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

export default ColorPicker
