import { mockFleetFactory } from '@/fleet'
import { mockGridFactory } from '@/grid'
import { Team } from '@/team'
import { Game } from './game'

export const mockGameFactory = (
  grid = mockGridFactory(),
  fleetA = mockFleetFactory(Team.A, grid),
  fleetB = mockFleetFactory(Team.B, grid)
): Game => new Game(grid, fleetA, fleetB)
