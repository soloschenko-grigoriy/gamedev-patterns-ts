import { IAction } from '@/utils'
import { GameStateMachina } from './state-machina'

export class GameShowStartUIAction implements IAction {
  public Execute(deltaTime: number): void {
    console.log('GameShowStartUIAction')
  }
}

export class GameHideStartUIAction implements IAction {
  public Execute(deltaTime: number): void {
    console.log('GameHideStartUIAction')
  }
}

export class GameSelectNextActiveShipAction implements IAction {
  constructor(private readonly _stateMachina: GameStateMachina){}

  public Execute(deltaTime: number): void {
    console.log('GameSelectNextActiveShipAction')
    this._stateMachina.Owner.CurrentFleet?.Activate()
  }
}

export class GameMakeMoveAction implements IAction {
  public Execute(deltaTime: number): void {
    console.log('GameMakeMoveAction')
  }
}

export class GameShowEndUIAction implements IAction {
  public Execute(deltaTime: number): void {
    console.log('GameShowEndUIAction')
  }
}

export class GameHideEndUIAction implements IAction {
  public Execute(deltaTime: number): void {
    console.log('GameHideEndUIAction')
  }
}

export class GameResetAction implements IAction {
  public Execute(deltaTime: number): void {
    console.log('GameResetAction')
  }
}


