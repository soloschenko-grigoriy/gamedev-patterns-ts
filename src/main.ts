import { Game } from '@/game'
import { Grid } from '@/grid'
import { Fleet } from '@/fleet'
import { Team } from '@/team'
import { Settings } from './settings'

const grid = new Grid()
 new Game(
   grid,
   new Fleet(Team.A, grid, Settings.ships.fleetSize),
   new Fleet(Team.B, grid, Settings.ships.fleetSize)
 ).Awake()
