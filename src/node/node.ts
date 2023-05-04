import { CanvasLayer } from '@/canvas-layer'
import { Entity, Vector2D } from '@/utils'
import { NodeDrawComponent } from './components'

export class Node extends Entity {
  /**
   * @todo replace temp property with real functionality
   */
  public IsActive = false

  public get Size(): Vector2D {
    return new Vector2D(
      this.End.x - this.Start.x,
      this.End.y - this.Start.y
    )
  }

  public get Center(): Vector2D {
    return new Vector2D(
      this.Start.x + this.Size.x / 2,
      this.Start.y + this.Size.y / 2
    )
  }

  constructor(
    public readonly Start: Vector2D,
    public readonly End: Vector2D,
    public readonly Index: Vector2D
  ) {
    super()
  }

  public Awake(): void {
    this.AddComponent(new NodeDrawComponent())

    super.Awake()

    // @todo remove temp dirty round
    document.body.addEventListener('click', (e: MouseEvent) => {
      const point = CanvasLayer.Background.CalcLocalPointFrom(new Vector2D(e.clientX, e.clientY))
      if(point && this.Occupies(point)){
        this.IsActive =  true
      }
    })
  }

  public Occupies(point: Vector2D): boolean {
    if (point.x < this.Start.x) {
      return false
    }

    if (point.x > this.End.x) {
      return false
    }

    if (point.y < this.Start.y) {
      return false
    }

    if (point.y > this.End.y) {
      return false
    }

    return true
  }
}
