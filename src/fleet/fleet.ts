import { Entity } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Team } from '@/team'
import { Ship } from '@/ship'
import { Settings } from '@/settings'
import { Grid } from '@/grid'

export class Fleet extends Entity {
  private _ships: Ship[] = []
  private _activeShip: Ship | null

  public get Ships(): Ship[] {
    return [...this._ships]
  }

  constructor(
    public readonly Team: Team,
    private readonly _grid: Grid,
    private readonly _size: number
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

  public Activate(): void {
    const nextShip = this._ships[this.FindIndexOfNextShip()]

    if(this._activeShip){
      this._activeShip.IsActive = false
    }

    this._activeShip = nextShip
    this._activeShip.IsActive = true
    this._grid.ActiveShip = this._activeShip
  }

  private PrepareShips(): void {
    const dimension = Settings.grid.dimension
    const nodes = this._grid.Nodes

    for (let i = 0; i < this._size; i++) {
      const node = this.Team == Team.A ? nodes[i * dimension] : nodes[nodes.length - 1 - i * dimension]
      const ship = new Ship(this, node)
      this._ships.push(ship)
      ship.Awake()
    }
  }

  private FindIndexOfNextShip(): number {
    if(!this._activeShip){
      return 0
    }

    const currentIndex = this._ships.indexOf(this._activeShip)
    const index = currentIndex + 1

    if(index >= this._ships.length){
      return 0
    }

    return index
  }
}
