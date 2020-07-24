import { Entity, Vector2D } from '@/utils'
import { Fleet } from '@/fleet'
import { ShipDrawComponent, ShipFlightComponent } from './components'
import { Node } from '@/node'

export class Ship extends Entity {
  private readonly _flightComponent: ShipFlightComponent

  public get Position(): Vector2D | null {
    return this._flightComponent.Position
  }

  constructor(
    public readonly Factory: Fleet,
    node: Node
  ) {
    super()

    this._flightComponent = new ShipFlightComponent()
    this._flightComponent.Node = node
  }

  public Awake(): void {
    this.AddComponent(this._flightComponent)
    this.AddComponent(new ShipDrawComponent())

    super.Awake()
  }
}
