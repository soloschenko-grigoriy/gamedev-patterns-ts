import { Entity } from '@/utils'

export class Game extends Entity {
  public Entities: Entity[] = []
  private _lastTimestamp = 0

  public Awake(): void {
    super.Awake()

    // awake all children
    this.Entities.map(entity => entity.Awake())

    // Make sure Update starts after All entities are awaken
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        // set initial timestamp
        this._lastTimestamp = Date.now()

        // start update loop
        this.Update()
      })
    }, 0)
  }

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    // update all components
    super.Update(deltaTime)

    // update all children
    this.Entities.map(entity => entity.Update(deltaTime))

    // update the timestamp
    this._lastTimestamp = Date.now()

    // Invoke on next frame
    window.requestAnimationFrame(() => this.Update())
  }
}
