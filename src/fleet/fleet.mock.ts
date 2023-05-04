import { Fleet } from '@/fleet'
import { Team } from '@/team'

export const mockFleetFactory = (team = Team.A): Fleet => new Fleet(team)
