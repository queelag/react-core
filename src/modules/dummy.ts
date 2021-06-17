import { MutableRefObject } from 'react'

export class Dummy {
  static get ref(): MutableRefObject<any> {
    return { current: document.createElement('div') }
  }
}
