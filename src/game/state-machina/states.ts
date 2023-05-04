import { IAction, IState } from '@/utils'
import { GameStateMachina } from './state-machina'
import {
  GameOver,
  GameOverToTeamA,
  GameStartToTeamA,
  GameTeamAToTeamB,
  GameTeamBToTeamA
} from './transitions'
import { GameHideEndUIAction, GameHideStartUIAction, GameMakeMoveAction, GameResetAction, GameSelectNextActiveShipAction, GameShowEndUIAction, GameShowStartUIAction } from './actions'

export class GameStateStart implements IState {
  OnEnterActions: IAction[] = [new GameShowStartUIAction()]
  OnUpdateActions: IAction[]= []
  OnExitActions: IAction[] = [new GameHideStartUIAction()]
  Transitions = [new GameStartToTeamA(this._stateMachina)]

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameStateTeamA implements IState {
  OnEnterActions: IAction[] = [new GameSelectNextActiveShipAction(this._stateMachina)]
  OnUpdateActions: IAction[] = [new GameMakeMoveAction()]
  OnExitActions: IAction[] = []
  Transitions = [
    new GameTeamAToTeamB(this._stateMachina),
    new GameOver(this._stateMachina)
  ]

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameStateTeamB implements IState {
  OnEnterActions: IAction[] = [new GameSelectNextActiveShipAction(this._stateMachina)]
  OnUpdateActions: IAction[] = [new GameMakeMoveAction()]
  OnExitActions: IAction[] = []
  Transitions = [
    new GameTeamBToTeamA(this._stateMachina),
    new GameOver(this._stateMachina)
  ]

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameStateOver implements IState {
  OnEnterActions: IAction[] = [new GameShowEndUIAction()]
  OnUpdateActions: IAction[] = []
  OnExitActions: IAction[] = [new GameResetAction(), new GameHideEndUIAction()]
  Transitions = [new GameOverToTeamA(this._stateMachina)]

  constructor(private readonly _stateMachina: GameStateMachina){}
}
