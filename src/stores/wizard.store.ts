import { Logger, noop, tcp } from '@queelag/core'
import { ComponentName, DirectionHorizontal } from '../definitions/enums'
import { ComponentStoreProps, WizardStep, WizardStepPartial } from '../definitions/interfaces'
import { WizardProps } from '../definitions/props'
import { ComponentStore } from '../modules/component.store'
import { Dummy } from '../modules/dummy'

/**
 * An abstraction for Wizard stores, handles cursors and steps.
 *
 * @category Store
 */
export class WizardStore extends ComponentStore<HTMLDivElement> {
  /**
   * A string which determines the active step name.
   */
  activeStepName: string
  /** @internal */
  private _steps: WizardStep[] = []

  constructor(props: WizardProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.WIZARD, props)

    this.activeStepName = props.activeStepName || (props.steps[0] ? props.steps[0].name || '' : '')
    this.onStepChange = props.onStepChange || noop
    this.steps = props.steps as WizardStep[]
  }

  /**
   * Goes to the next step.
   */
  onClickNextStep = async () => {
    let previous: string

    previous = this.activeStepName
    Logger.debug(this.id, 'onClickNext', `The previous step has been set to ${previous}.`)

    if (this.activeStep.canGoNext()) {
      this.setActiveStepName(this.nextStep.name)
    }

    await tcp(() => this.onStepChange(previous, this.activeStepName, DirectionHorizontal.RIGHT))
  }

  /**
   * Goes to the previous step.
   */
  onClickPreviousStep = async () => {
    let previous: string

    previous = this.activeStepName
    Logger.debug(this.id, 'onClickPrevious', `The previous step has been set to ${previous}.`)

    if (this.activeStep.canGoBack()) {
      this.setActiveStepName(this.previousStep.name)
    }

    await tcp(() => this.onStepChange(previous, this.activeStepName, DirectionHorizontal.LEFT))
  }

  /**
   * Triggers an onStepChange event with a LEFT horizontal direction from the first step to the first step.
   */
  onClickExit = async () => {
    await tcp(() => this.onStepChange(this.steps[0].name, this.steps[0].name, DirectionHorizontal.LEFT))
  }

  /**
   * Triggered by the onClickPrevious, onClickNext and onClickExit events.
   */
  onStepChange = (from: string, to: string, direction: DirectionHorizontal): any => {}

  setActiveStepName(name: string): void {
    this.activeStepName = name
    Logger.debug(this.id, 'setActiveStepName', `The active step has been set to ${this.activeStepName}.`)

    this.update()
  }

  findStepIndexByName(name: string): number {
    return this.steps.findIndex((v: WizardStep) => v.name === name)
  }

  get activeStep(): WizardStep {
    return this.steps.find((v: WizardStep) => v.name === this.activeStepName) || Dummy.wizardStep
  }

  get activeStepIndex(): number {
    return this.findStepIndexByName(this.activeStepName)
  }

  get nextStep(): WizardStep {
    return this.steps[this.activeStepIndex + 1] || this.steps[this.steps.length - 1]
  }

  get previousStep(): WizardStep {
    return this.steps[this.activeStepIndex - 1] || this.steps[0]
  }

  /**
   * An array of {@link WizardStep}.
   */
  get steps(): WizardStep[] {
    return this._steps
  }

  get isFirstStep(): boolean {
    return this.activeStepIndex === 0
  }

  get isLastStep(): boolean {
    return this.activeStepIndex === this.steps.length - 1
  }

  set steps(steps: WizardStep[]) {
    this._steps = steps.map((v: WizardStepPartial) => Object.assign({}, Dummy.wizardStep, v))
  }
}
