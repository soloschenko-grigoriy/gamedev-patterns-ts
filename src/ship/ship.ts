import { Entity, Vector2D } from '@/utils'
import { Fleet } from '@/fleet'
import { ShipDrawComponent, ShipLocomotionComponent } from './components'
import { Node } from '@/node'
import { Settings } from '@/settings'

export class Ship extends Entity {
  private readonly _locomotionComponent: ShipLocomotionComponent
  private _isActive = false;

   public get IsActive(): boolean {
     return this._isActive
   }

   public set IsActive(v: boolean) {
     this._isActive = v

     if (v) {
       this._locomotionComponent.Node.FindAndSetInLocomotionRange(Settings.ships.locomotion.range)
     }
   }

  public get Position(): Vector2D | null {
    return this._locomotionComponent.Position
  }

  constructor(public readonly Factory: Fleet, node: Node) {
    super()

    this._locomotionComponent = new ShipLocomotionComponent(node)
  }

  public Awake(): void {
    this.AddComponent(this._locomotionComponent)
    this.AddComponent(new ShipDrawComponent())

    super.Awake()
  }
}
