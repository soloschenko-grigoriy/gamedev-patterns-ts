import { Entity, Vector2D } from '@/utils'
import { NodeDrawComponent } from './components'

export class Node extends Entity {
  public get Width(): number {
    return this.End.x - this.Start.x
  }

  public get Height(): number {
    return this.End.y - this.Start.y
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
  }
}
