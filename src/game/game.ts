import { Entity } from '@/utils'
import { Grid } from '@/grid'
import { Fleet } from '@/fleet'
import { GameClickComponent } from './components'

export class Game extends Entity {
  private _lastTimestamp = 0

  private _entities: Entity[] = []

  public get Entities(): Entity[] {
    return this._entities
  }

  constructor(grid: Grid, fleetA: Fleet, fleetB: Fleet) {
    super()

    this._entities.push(grid, fleetA, fleetB)
  }

  public Awake(): void {
    this.AddComponent(new GameClickComponent())

    super.Awake()

    // awake all children
    for (const entity of this.Entities) {
      entity.Awake()
    }

    // Make sure Update starts after all entities are awaken
    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = Date.now()

      // start update loop
      this.Update()
    })
  }

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    // update all components
    super.Update(deltaTime)

    // update all children
    for (const entity of this.Entities) {
      entity.Update(deltaTime)
    }

    // update the timestamp
    this._lastTimestamp = Date.now()

    // Invoke on next frame
    window.requestAnimationFrame(() => this.Update())
  }
}
