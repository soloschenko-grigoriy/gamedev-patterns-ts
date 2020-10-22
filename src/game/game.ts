import { ClickComponent, Entity, Vector2D } from '@/utils'
import { Grid } from '@/grid'
import { Fleet } from '@/fleet'
import { CanvasLayer } from '@/canvas-layer'

export class Game extends Entity {
  private _lastTimestamp = 0

  private _entities: Entity[] = []

  public get Entities(): Entity[] {
    return this._entities
  }

  constructor(grid: Grid, fleetA: Fleet, fleetB: Fleet){
    super()

    this._entities.push(grid, fleetA, fleetB)
  }

  public Awake(): void {
    super.Awake()

    // awake all children
    for (const entity of this.Entities) {
      entity.Awake()
    }

    // Listen for click event
    document.body.addEventListener('click', this.HandleClick.bind(this))

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

  private HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.GetLocalPointOf(new Vector2D(e.clientX, e.clientY))
    if (!point) {
      return
    }

    for (const entity of this.Entities) {
      if (!entity.HasComponent(ClickComponent)) {
        continue
      }

      entity.GetComponent(ClickComponent).ClickOn(point)
    }
  }
}
