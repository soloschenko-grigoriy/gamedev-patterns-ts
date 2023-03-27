export interface IAction {
  Execute(deltaTime: number): void
}

export interface ICondition {
  Check(...args: unknown[]): boolean
}

export interface ITransition {
  Target: IState
  TrueCondition: ICondition | null
  FalseCondition: ICondition | null
}

export interface IState {
  OnEnterActions: IAction[]
  OnUpdateActions: IAction[]
  OnExitActions: IAction[]

  Transitions: ITransition[]
}
