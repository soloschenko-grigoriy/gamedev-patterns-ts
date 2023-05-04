import { Entity } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Team } from '@/team'
import { Ship } from '@/ship'
import { Settings } from '@/settings'

export class Fleet extends Entity {
  private _ships: Ship[] = []

  constructor(public readonly Team: Team) {
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
    const fleetSize = Settings.ships.fleetSize

    for (let i = 0; i < fleetSize; i++) {
      const ship = new Ship(this)
      this._ships.push(ship)
      ship.Awake()
    }
  }
}
