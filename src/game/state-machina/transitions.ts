import { ITransition } from '@/utils'
import { GameStateTeamA, GameStateOver, GameStateTeamB } from './states'
import { GameStateMachina } from './state-machina'
import {
  HasGameCurrentFleetCondition,
  HasTeamNoShipsLeftCondition,
  IsCurrentFleetTeamACondition,
  IsCurrentFleetTeamBCondition
} from './conditions'

export class GameStartToTeamA implements ITransition {
  public TrueCondition = new HasGameCurrentFleetCondition(this._stateMachina.Owner)

  public FalseCondition = null

  public get Target(): GameStateTeamA {
    return this._stateMachina.States.find(s => s instanceof GameStateTeamA) as GameStateTeamA
  }

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameTeamAToTeamB implements ITransition {
  public TrueCondition = new IsCurrentFleetTeamBCondition(this._stateMachina.Owner)

  public FalseCondition = null

  public get Target(): GameStateTeamB {
    return this._stateMachina.States.find(s => s instanceof GameStateTeamB) as GameStateTeamB
  }

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameTeamBToTeamA implements ITransition {
  public TrueCondition = new IsCurrentFleetTeamACondition(this._stateMachina.Owner)

  public FalseCondition = null

  public get Target(): GameStateTeamA {
    return this._stateMachina.States.find(s => s instanceof GameStateTeamA) as GameStateTeamA
  }

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameOver implements ITransition {
  public TrueCondition = new HasTeamNoShipsLeftCondition(this._stateMachina.Owner)

  public FalseCondition = null

  public get Target(): GameStateOver {
    return this._stateMachina.States.find(s => s instanceof GameStateOver) as GameStateOver
  }

  constructor(private readonly _stateMachina: GameStateMachina){}
}

export class GameOverToTeamA implements ITransition {
  public TrueCondition = null

  public FalseCondition = new HasTeamNoShipsLeftCondition(this._stateMachina.Owner)

  public get Target(): GameStateTeamA {
    return this._stateMachina.States.find(s => s instanceof GameStateTeamA) as GameStateTeamA
  }

  constructor(private readonly _stateMachina: GameStateMachina){}
}

