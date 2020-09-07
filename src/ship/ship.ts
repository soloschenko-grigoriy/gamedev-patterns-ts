import { Entity } from '@/utils'
import { Fleet } from '@/fleet'
import { ShipDrawComponent } from './components'

export class Ship extends Entity {
  constructor(public readonly Factory: Fleet) {
    super()
  }

  public Awake(): void {
    this.AddComponent(new ShipDrawComponent())

    super.Awake()
  }
}
