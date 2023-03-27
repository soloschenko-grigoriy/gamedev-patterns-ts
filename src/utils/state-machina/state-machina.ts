import { IUpdate } from '@/utils'
import { IAction, IState } from './state-machina.h'

export abstract class StateMachina<O> implements IUpdate {
  private _states: IState[] = []
  private _current: IState | null = null
  private _init: IState
  private _isRunning: boolean
  private _deltaTime = 0

  public get States(): IState[] {
    return [...this._states]
  }

  public get Current(): IState | null {
    return this._current
  }

  public get IsRunning(): boolean {
    return this._isRunning
  }

  constructor(public readonly Owner: O) {
    this._isRunning = false
  }

  public SetStates(v: IState[], init: IState): void {
    this.Pause()

    this._states = [...v]
    this._init = init
  }

  public Start(): void {
    this._isRunning = true

    if(!this._current){
      this.Init()
    }
  }

  public Pause(): void {
    this._isRunning = false
  }

  public Update(deltaTime: number): void {
    this._deltaTime = deltaTime

    if(!this._isRunning || !this._current){
      return
    }

    this.CheckTransitions()

    this.ExecuteActions(this._current.OnUpdateActions)
  }

  private Init(): void {
    this._current = this._init

    this.ExecuteActions(this._current.OnEnterActions)
  }

  private CheckTransitions(): void {
    if(!this._current){
      return
    }

    for(const transition of this._current.Transitions){
      if(transition.TrueCondition !== null && transition.TrueCondition.Check()){
        this.TransitionTo(transition.Target)
        break
      }

      if (transition.FalseCondition !== null && !transition.FalseCondition.Check()) {
        this.TransitionTo(transition.Target)
        break
      }
    }
  }

  private TransitionTo(nextState: IState): void {
    if(!this._current){
      return
    }

    this.ExecuteActions(this._current.OnExitActions)

    this._current = nextState

    this.ExecuteActions(this._current.OnEnterActions)
  }

  private ExecuteActions(actions: IAction[]): void {
    for(const action of actions){
      action.Execute(this._deltaTime)
    }
  }
}
