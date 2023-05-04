import { Ship } from '@/ship'
import { mockFleetFactory } from '@/fleet'

export const mockShipFactory = (
  fleet = mockFleetFactory()
): Ship => new Ship(fleet)
