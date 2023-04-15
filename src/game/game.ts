import { Entity } from '@/utils'
import { Grid } from '@/grid'
import { Fleet } from '@/fleet'
import { GameInputComponent } from './components'
import { GameStateMachina, GameStateOver, GameStateStart, GameStateTeamA, GameStateTeamB } from './state-machina'

export class Game extends Entity {
  private _lastTimestamp = 0

  private _entities: Entity[] = []

  private _currentFleet: Fleet | null = null

  private readonly _stateMachina = new GameStateMachina(this)

  public get Entities(): Entity[] {
    return this._entities
  }

  public get CurrentFleet(): Fleet | null {
    return this._currentFleet
  }

  public get FleetA(): Fleet {
    return this._fleetA
  }

  public get FleetB(): Fleet {
    return this._fleetB
  }

  constructor(grid: Grid, private readonly _fleetA: Fleet, private readonly _fleetB: Fleet) {
    super()

    this._entities.push(grid, _fleetA, _fleetB)
  }

  public Awake(): void {
    this.AddComponent(new GameInputComponent())

    super.Awake()

    // awake all children
    for (const entity of this.Entities) {
      entity.Awake()
    }

    this.InitStateMachina()

    // Make sure Update starts after all entities are awaken
    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = Date.now()

      // start update loop
      this.Update()
    })
  }

  public InitStateMachina() : void{
    const stateStart = new GameStateStart(this._stateMachina)
    const stateTeamA = new GameStateTeamA(this._stateMachina)
    const stateTeamB = new GameStateTeamB(this._stateMachina)
    const stateOver = new GameStateOver(this._stateMachina)

    this._stateMachina.SetStates([stateStart, stateTeamA, stateTeamB, stateOver], stateStart)
    this._stateMachina.Start()
  }

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    // update all components
    super.Update(deltaTime)

    // update all children
    for (const entity of this.Entities) {
      entity.Update(deltaTime)
    }

    this._stateMachina.Update(deltaTime)

    // update the timestamp
    this._lastTimestamp = Date.now()

    // Invoke on next frame
    window.requestAnimationFrame(() => this.Update())
  }
}
