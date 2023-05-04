import { Entity, Vector2D } from '@/utils'
import { Fleet } from '@/fleet'
import {
  ShipDrawComponent,
  ShipLocomotionComponent,
} from './components'
import { Settings } from '@/settings'

export class Ship extends Entity {
  private readonly _locomotionComponent: ShipLocomotionComponent
  private readonly _drawComponent: ShipDrawComponent
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

  public get PreviousPosition(): Vector2D | null {
    return this._locomotionComponent.PreviousPosition
  }

  public get Position(): Vector2D | null {
    return this._locomotionComponent.Position
  }

  constructor(
    public readonly Factory: Fleet,
    locomotionComponent: ShipLocomotionComponent,
    drawComponent: ShipDrawComponent
  ) {
    super()

    this._locomotionComponent = locomotionComponent
    this._drawComponent = drawComponent
  }

  public Awake(): void {
    this.AddComponent(this._locomotionComponent)
    this.AddComponent(this._drawComponent)

    super.Awake()
  }
}
