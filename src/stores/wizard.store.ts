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
  active: string
  /** @internal */
  private _steps: WizardStep[] = []

  constructor(props: WizardProps & ComponentStoreProps<HTMLDivElement>) {
    super(ComponentName.WIZARD, props)

    this.active = props.active || (props.steps[0] ? props.steps[0].name : '')
    this.onStepChange = props.onStepChange || noop
    this.steps = props.steps as WizardStep[]
  }

  /**
   * Goes to the next step.
   */
  onClickNext = async () => {
    let previous: string

    previous = this.active

    if (this.step.canGoNext()) {
      this.active = this.nextStep.name
      Logger.debug(this.id, 'onClickNext', `The active step has been set to ${this.active}.`)

      this.update()
    }

    await tcp(() => this.onStepChange(previous, this.active, DirectionHorizontal.RIGHT))
  }

  /**
   * Goes to the previous step.
   */
  onClickPrevious = async () => {
    let previous: string

    previous = this.active

    if (this.step.canGoBack()) {
      this.active = this.previousStep.name
      Logger.debug(this.id, 'onClickPrevious', `The active step has been set to ${this.active}.`)

      this.update()
    }

    await tcp(() => this.onStepChange(previous, this.active, DirectionHorizontal.LEFT))
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

  findStepIndexByName(name: string): number {
    return this.steps.findIndex((v: WizardStep) => v.name === name)
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

  /**
   * An array of {@link WizardStep}.
   */
  get steps(): WizardStep[] {
    return this._steps
  }

  get isFirstStep(): boolean {
    return this.findStepIndexByName(this.active) === 0
  }

  get isLastStep(): boolean {
    return this.findStepIndexByName(this.active) === this.steps.length - 1
  }

  set steps(steps: WizardStep[]) {
    this._steps = steps.map((v: WizardStepPartial) => Object.assign({}, Dummy.wizardStep, v))
  }
}
