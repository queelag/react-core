import { ID, noop, NumberUtils, tcp } from '@queelag/core'
import { MutableRefObject } from 'react'
import { ComponentName, DirectionHorizontal } from '../definitions/enums'
import { WizardProps } from '../definitions/props'
import { WizardOnStepChange, WizardStep, WizardStepPartial } from '../definitions/types'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * @category Store
 */
export class WizardStore extends ComponentStore<HTMLDivElement> {
  active: string
  steps: WizardStep[]

  constructor(
    active: string = '',
    id: ID = '',
    onStepChange: WizardOnStepChange = noop,
    ref: MutableRefObject<HTMLDivElement> = Dummy.ref,
    steps: WizardStepPartial[] = [],
    update: () => void = noop
  ) {
    super(ComponentName.WIZARD, id, ref, update)

    this.active = active
    this.onStepChange = onStepChange
    this.steps = []
    this.updateSteps(steps)
  }

  updateSteps(steps: WizardStepPartial[]): void {
    this.steps = steps.map((v: WizardStepPartial) => Object.assign({}, Dummy.wizardStep, v))
  }

  onClickNext = async () => {
    let previous: string

    previous = this.active

    if (this.step.canGoNext()) {
      this.setActive(this.nextStep.name)
    }

    await tcp(() => this.onStepChange(previous, this.active, DirectionHorizontal.RIGHT))
  }

  onClickPrevious = async () => {
    let previous: string

    previous = this.active

    if (this.step.canGoBack()) {
      this.setActive(this.previousStep.name)
    }

    await tcp(() => this.onStepChange(previous, this.active, DirectionHorizontal.LEFT))
  }

  onClickExit = async () => {
    await tcp(() => this.onStepChange(this.steps[0].name, this.steps[0].name, DirectionHorizontal.LEFT))
  }

  onStepChange = (from: string, to: string, direction: DirectionHorizontal): any => {}

  setActive(name: string): void {
    this.active = name
    this.update()
  }

  findStepIndexByName(name: string): number {
    return this.steps.findIndex((v: WizardStep) => v.name === name)
  }

  findStepElementByIndex(index: number): HTMLDivElement {
    return this.element.querySelector(`.step:nth-child(${index + 1})`) || document.createElement('div')
  }

  findBarElementByIndex(index: number): HTMLDivElement {
    return this.element.querySelector(`.bar:nth-child(${index + 1})`) || document.createElement('div')
  }

  get index(): number {
    return this.findStepIndexByName(this.active)
  }

  get nextStep(): WizardStep {
    return this.steps[this.index + 1] || this.steps[this.steps.length - 1]
  }

  get previousStep(): WizardStep {
    return this.steps[this.index - 1] || this.steps[0]
  }

  get step(): WizardStep {
    return this.steps.find((v: WizardStep) => v.name === this.active) || Dummy.wizardStep
  }

  get barElements(): NodeListOf<HTMLDivElement> {
    return this.element.children[0]?.querySelectorAll('.bar') || []
  }

  get stepElements(): NodeListOf<HTMLDivElement> {
    return this.wrapperElement.querySelectorAll('.step')
  }

  get wrapperElement(): HTMLDivElement {
    return (this.element.children[1]?.children[0] as HTMLDivElement) || document.createElement('div')
  }

  get wrapperElementWidth(): number {
    return NumberUtils.parseFloat(getComputedStyle(this.wrapperElement).width)
  }

  get isFirstStep(): boolean {
    return this.findStepIndexByName(this.active) === 0
  }

  get isLastStep(): boolean {
    return this.findStepIndexByName(this.active) === this.steps.length - 1
  }
}

/** @category Constant */
export const WIZARD_STORE_KEYS: (keyof WizardProps & keyof WizardStore)[] = ['active', 'id', 'onStepChange', 'steps']
