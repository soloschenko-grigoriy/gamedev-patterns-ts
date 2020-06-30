import { Entity } from '@/utils'

export class Game extends Entity {
  private _lastTimestamp = 0

  public Entities: Entity[] = []

  public Awake(): void {
    super.Awake()

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
