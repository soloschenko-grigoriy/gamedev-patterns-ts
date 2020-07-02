import { Entity } from '@/utils'
import { Grid } from '@/grid'

export class Game extends Entity {
  private _lastTimestamp = 0

  private _entities: Entity[] = []

  public get Entities(): Entity[] {
    return this._entities
  }

  public Awake(): void {
    super.Awake()

    // instantiate and Grid to the list of children
    this._entities.push(new Grid())

    // awake all children
    for (const entity of this.Entities){
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
    for (const entity of this.Entities){
      entity.Update(deltaTime)
    }

    // update the timestamp
    this._lastTimestamp = Date.now()

    // Invoke on next frame
    window.requestAnimationFrame(() => this.Update())
  }
}
