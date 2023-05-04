import { IComponent, Vector2D } from '@/utils'
import { Ship } from '@/ship'
import { Node } from '@/node'

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship
  protected _node: Node
  protected _previousPosition: Vector2D | null = null

  public get Node(): Node {
    return this._node
  }

  public get Position(): Vector2D | null {
    return this.Node.Center
  }

  public get PreviousPosition(): Vector2D | null {
    return this._previousPosition
  }

  constructor(node: Node) {
    this._node = node
  }

  public Awake(): void {
    this._previousPosition = null
  }

  public Update(deltaTime: number): void {
    if (this.Entity.IsActive && this._node.Next) {
      this._previousPosition = this._node.Center
      this._node = this._node.Next
    }
  }
}
