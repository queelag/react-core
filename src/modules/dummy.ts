import { MutableRefObject } from 'react'
import { Blank } from '../components/Blank'
import { Color } from '../definitions/enums'
import { ColorPickerConfiguration, ColorPickerConfigurationValue, InputFileItem, WizardStep } from '../definitions/interfaces'

/** @internal */
export class Dummy {
  static get colorPickerConfiguration(): ColorPickerConfiguration {
    return {
      background: this.colorPickerConfigurationValue,
      border: this.colorPickerConfigurationValue,
      divide: this.colorPickerConfigurationValue,
      feedback: {
        error: Color.RED,
        information: Color.BLUE,
        success: Color.GREEN,
        warning: Color.YELLOW
      },
      text: this.colorPickerConfigurationValue
    }
  }

  static get colorPickerConfigurationValue(): ColorPickerConfigurationValue {
    return {
      any: () => ['', '', '', ''],
      gray: ['', '', '', ''],
      mono: '',
      monoInverted: ''
    }
  }

  static get inputFileItem(): InputFileItem {
    return {
      data: '',
      id: '',
      name: ''
    }
  }

  static get ref(): MutableRefObject<any> {
    return { current: document.createElement('div') }
  }

  static get wizardStep(): WizardStep {
    return {
      canGoBack: () => true,
      canGoNext: () => true,
      content: Blank,
      description: '',
      name: '',
      title: ''
    }
  }
}
