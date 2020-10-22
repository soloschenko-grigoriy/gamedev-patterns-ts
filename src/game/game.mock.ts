import { Game } from '@/game'
import { mockFleetFactory } from '@/fleet'
import { mockGridFactory } from '@/grid'
import { Team } from '@/team'


export const mockGameFactory = (
  grid = mockGridFactory(),
  fleetA = mockFleetFactory(Team.A, grid),
  fleetB = mockFleetFactory(Team.B, grid)
): Game => new Game(grid, fleetA, fleetB)
