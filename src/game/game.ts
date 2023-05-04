import { Entity } from '@/utils'
import { Settings } from '@/settings'
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

    this.DirtyDraw()
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

  private DirtyDraw(): void {
    // Create and attach Canvas to the DOM
    const canvas = document.createElement('canvas')
    const canvasSize = (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset
    canvas.setAttribute('width', canvasSize.toString())
    canvas.setAttribute('height', canvasSize.toString())
    document.body.appendChild(canvas)

    const size = Settings.grid.nodeSize
    const offset = Settings.grid.nodeOffset
    for (let y = 0; y < Settings.grid.dimension; y++) { // <--- ADD
      for (let x = 0; x < Settings.grid.dimension; x++) {
        const ctx = canvas.getContext('2d')!
        ctx.beginPath()
        ctx.fillStyle = Settings.grid.color
        ctx.rect((size + offset) * x, (size + offset) * y, size, size)
        ctx.fill()
      }
    }
  }

}
