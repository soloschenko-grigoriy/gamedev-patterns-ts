import { Entity } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Team } from '@/team'
import { Ship } from '@/ship'
import { Settings } from '@/settings'
import { Grid } from '@/grid'

export class Fleet extends Entity {
  private _ships: Ship[] = []

  constructor(
    public readonly Team: Team,
    private readonly _grid: Grid
  ) {
    super()
  }

  public Awake(): void {
    super.Awake()

    // init and awake ships
    this.PrepareShips()
  }

  public Update(deltaTime: number): void {
    super.Update(deltaTime)

    this._ships.map(ship => ship.Update(deltaTime))
  }

  private PrepareShips(): void {
    const dimension = Settings.grid.dimension
    const fleetSize = Settings.ships.fleetSize
    const nodes = this._grid.Nodes

    for (let i = 0; i < fleetSize; i++) {
      const node = this.Team == Team.A ? nodes[i * dimension] : nodes[nodes.length - 1 - i * dimension]
      const ship = new Ship(this, node)
      this._ships.push(ship)
      ship.Awake()
    }

    // @todo start with state machine
    if (this.Team === Team.A) {
      const activeShip = this._ships[0]
      activeShip.IsActive = true
      this._grid.ActiveShip = activeShip
    }
  }
}
