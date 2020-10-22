import { Fleet } from '@/fleet'
import { Team } from '@/team'
import { mockGridFactory } from '@/grid'

export const mockFleetFactory = (
  team = Team.A,
  grid = mockGridFactory()
): Fleet => new Fleet(team, grid)
