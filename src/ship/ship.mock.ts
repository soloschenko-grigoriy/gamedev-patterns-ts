import { Ship } from '@/ship'
import { mockFleetFactory } from '@/fleet'
import { mockNodeFactory } from '@/node'
import { ShipDrawComponent, ShipLocomotionComponent } from './components'

export const mockShipFactory = (
  fleet = mockFleetFactory(),
  locomotionComponent = new ShipLocomotionComponent(mockNodeFactory()),
  drawComponent = new ShipDrawComponent()
): Ship => new Ship(fleet, locomotionComponent, drawComponent)
