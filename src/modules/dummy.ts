import { Environment } from '@queelag/core'
import { MutableRefObject } from 'react'
import { Color, Theme } from '../definitions/enums'
import {
  AppearanceData,
  ColorPickerConfiguration,
  ColorPickerConfigurationValue,
  ConfigurationData,
  InputFileItem,
  OnboardingItem,
  WizardStep
} from '../definitions/interfaces'

/** @internal */
export class Dummy {
  static get appearanceData(): AppearanceData {
    return {
      theme: Theme.SYSTEM
    }
  }

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

  static get configurationData(): ConfigurationData {
    return {
      ComponentStore: {
        generateIDOnConstruction: false
      }
    }
  }

  static get inputFileItem(): InputFileItem {
    return {
      base64: '',
      buffer: new ArrayBuffer(0),
      id: '',
      name: '',
      size: 0,
      timestamp: 0,
      type: ''
    }
  }

  static get onboardingItem(): OnboardingItem {
    return {
      description: '',
      title: ''
    }
  }

  static get ref(): MutableRefObject<any> {
    return { current: Environment.isWindowDefined ? document.createElement('div') : {} }
  }

  static get wizardStep(): WizardStep {
    return {
      canGoBack: () => true,
      canGoNext: () => true,
      children: () => ({ key: null, props: {}, type: 'div' }),
      description: '',
      name: '',
      title: ''
    }
  }
}
