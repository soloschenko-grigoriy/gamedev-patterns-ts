import { IComponent, Vector2D } from '@/utils'
import { Ship } from '@/ship'
import { Node } from '@/node'

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship

  protected _node: Node
  protected _path: Node[] = []
  protected _previousPosition: Vector2D | null = null

  public get Node(): Node {
    return this._node
  }

  public set Node(v: Node) {
    this._previousPosition = this.Position

    this._node = v
    this._node.Ship = this.Entity
  }

  public get Position(): Vector2D {
    return this.Node.Center
  }

  public get PreviousPosition(): Vector2D | null {
    return this._previousPosition
  }

  public set Path(v: Node[]) {
    this._path = [...v]
  }

  constructor(node: Node) {
    this._node = node
  }

  public Awake(): void {
    this._node.Ship = this.Entity
  }

  public Update(deltaTime: number): void {
    if(!this.Entity.IsActive){
      return
    }

    const next = this._path.shift()
    if(!next){
      this.Entity.OnMoveCompleted(this._node)
      return
    }

    this.Node.Ship = null
    this.Node = next
  }
}
