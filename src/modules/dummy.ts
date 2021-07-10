import { MutableRefObject } from 'react'
import * as S from 'superstruct'
import { Blank } from '../components/Blank'
import { Parent } from '../components/Parent'
import { Color } from '../definitions/enums'
import {
  BottomTabberItem,
  ColorPickerConfiguration,
  ColorPickerConfigurationValue,
  InputFileItem,
  Route,
  SidebarItem,
  TopTabberItem,
  WizardStep
} from '../definitions/types'

export class Dummy {
  static get bottomTabberItem(): BottomTabberItem {
    return {
      icon: Blank,
      name: ''
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

  static get route(): Route {
    return {
      children: [],
      component: Blank,
      name: '',
      parameters: {},
      path: '',
      parent: Parent,
      redirect: [],
      regex: new RegExp('')
    }
  }

  static get schema(): S.Struct {
    return S.any()
  }

  static get sidebarItem(): SidebarItem {
    return {
      icon: Blank,
      name: ''
    }
  }

  static get topTabberItem(): TopTabberItem {
    return {
      component: Blank,
      name: ''
    }
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
