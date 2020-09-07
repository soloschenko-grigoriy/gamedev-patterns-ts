import { IComponent, Vector2D } from '@/utils'
import { Ship } from '@/ship'
import { Node } from '@/node'

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship

  public Node: Node | null

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
