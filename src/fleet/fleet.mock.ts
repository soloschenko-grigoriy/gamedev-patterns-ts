import { Fleet } from '@/fleet'
import { Team } from '@/team'
import { mockGridFactory } from '@/grid'
import { Settings } from '@/settings'

export const mockFleetFactory = (
  team = Team.A,
  grid = mockGridFactory(),
  size = Settings.ships.fleetSize
): Fleet =>
  new Fleet(team, grid, size)
