import { Fleet } from '@/fleet'
import { Team } from '@/team'
import { Grid } from '@/grid'

export const mockFleetFactory = (team = Team.A, grid = new Grid()): Fleet =>
  new Fleet(team, grid)
