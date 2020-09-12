import { Entity, Vector2D } from '@/utils'
import { Fleet } from '@/fleet'
import { ShipDrawComponent, ShipLocomotionComponent } from './components'
import { Node } from '@/node'

export class Ship extends Entity {
  private readonly _locomotionComponent: ShipLocomotionComponent

  public get Position(): Vector2D | null {
    return this._locomotionComponent.Position
  }

  constructor(public readonly Factory: Fleet, node: Node) {
    super()

    this._locomotionComponent = new ShipLocomotionComponent()
    this._locomotionComponent.Node = node
  }

  public Awake(): void {
    this.AddComponent(this._locomotionComponent)
    this.AddComponent(new ShipDrawComponent())

    super.Awake()
  }
}
