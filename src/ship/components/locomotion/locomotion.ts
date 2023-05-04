import { IComponent, Vector2D } from '@/utils'
import { Ship } from '@/ship'
import { Node } from '@/node'

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship

  private _node: Node | null = null

  public get Node(): Node | null {
    return this._node
  }

  public set Node(v: Node | null) {
    this._node = v
  }

  public get Position(): Vector2D | null {
    return this.Node ? this.Node.Center : null
  }

  public Awake(): void {
    /* @todo */
  }

  public Update(deltaTime: number): void {
    /* @todo */
  }
}
