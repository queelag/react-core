import { MutableRefObject } from 'react'
import { Blank } from '../components/Blank'
import { Parent } from '../components/Parent'
import { BottomTabberItem, InputFileItem, Route, SidebarItem, TopTabberItem, WizardStep } from '../definitions/types'

export class Dummy {
  static get bottomTabberItem(): BottomTabberItem {
    return {
      icon: Blank,
      name: ''
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
      path: '',
      parent: Parent,
      redirect: []
    }
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
