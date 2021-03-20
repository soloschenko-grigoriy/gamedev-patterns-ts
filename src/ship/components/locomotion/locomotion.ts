import { IComponent, Vector2D } from '@/utils'
import { Ship } from '@/ship'
import { Node } from '@/node'

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship

  private _node: Node

  public get Node(): Node {
    return this._node
  }

  public set Node(v: Node) {
    this._node.Ship = null
    this._node = v
    this._node.Ship = this.Entity
  }

  public get Position(): Vector2D {
    return this.Node.Center
  }

  constructor(node: Node) {
    this._node = node
  }

  public Awake(): void {
    this._node.Ship = this.Entity
  }

  public Update(deltaTime: number): void {
    /* @todo */
  }
}
