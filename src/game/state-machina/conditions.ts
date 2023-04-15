import { ICondition } from '@/utils'
import { Game } from '../game'
import { Team } from '@/team'

export class HasTeamNoShipsLeftCondition implements ICondition {
  constructor(private _game: Game){}

  public Check(): boolean {
    return this._game.FleetA.Ships.length < 1 || this._game.FleetB.Ships.length < 1
  }
}

export class HasGameCurrentFleetCondition implements ICondition {
  constructor(private _game: Game){}

  public Check(): boolean {
    return !!this._game.CurrentFleet
  }
}

export class IsCurrentFleetTeamACondition implements ICondition {
  constructor(private _game: Game){}

  public Check(): boolean {
    return this._game.CurrentFleet?.Team === Team.A
  }
}

export class IsCurrentFleetTeamBCondition implements ICondition {
  constructor(private _game: Game){}

  public Check(): boolean {
    return this._game.CurrentFleet?.Team === Team.B
  }
}
