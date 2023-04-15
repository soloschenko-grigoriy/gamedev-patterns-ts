import { Fleet, mockFleetFactory } from '@/fleet'
import { IComponent } from '@/utils'
import { Ship } from '@/ship'
import { Settings } from '@/settings'
import { Team } from '@/team'
import { mockGridFactory } from '@/grid'

jest.mock('@/ship')
class C1 implements IComponent {
  public Entity: Fleet
  public Awake(): void { /*...*/ }
  public Update(deltaTime: number): void { /*...*/ }
}

class C2 implements IComponent {
  public Entity: Fleet
  public Awake(): void { /*...*/ }
  public Update(deltaTime: number): void { /*...*/ }
}

describe('>>> Fleet', () => {
  let fleet: Fleet

  const c1 = new C1()
  const c2 = new C2()

  beforeEach(() => {
    fleet = mockFleetFactory()
  })

  it('should awake and update all Components', () => {
    const spyAwake1 = jest.spyOn(c1, 'Awake')
    const spyAwake2 = jest.spyOn(c2, 'Awake')

    const spyUpdate1 = jest.spyOn(c1, 'Update')
    const spyUpdate2 = jest.spyOn(c2, 'Update')

    expect(spyAwake1).not.toBeCalled()
    expect(spyAwake2).not.toBeCalled()

    expect(spyUpdate1).not.toBeCalled()
    expect(spyUpdate2).not.toBeCalled()

    fleet.AddComponent(c1)
    fleet.AddComponent(c2)

    fleet.Awake()
    expect(spyAwake1).toBeCalled()
    expect(spyAwake2).toBeCalled()

    fleet.Update(1)
    expect(spyUpdate1).toBeCalled()
    expect(spyUpdate2).toBeCalled()
  })

  it('should awake and update all children', () => {
    const spyShipAwake = jest.spyOn(Ship.prototype, 'Awake')
    const spyShipUpdate = jest.spyOn(Ship.prototype, 'Update')

    expect(spyShipAwake).not.toBeCalled()
    expect(spyShipUpdate).not.toBeCalled()

    fleet.Awake()
    expect(spyShipAwake).toBeCalledTimes(Settings.ships.fleetSize)

    fleet.Update(0)
    expect(spyShipUpdate).toBeCalledTimes(Settings.ships.fleetSize)
  })

  it('should activate next Ship when requested', () => {
    const grid = mockGridFactory()

    fleet = mockFleetFactory(Team.A, grid, 3)
    fleet.Awake()

    expect(fleet.Ships.length).toBe(3)

    // activates first Ship
    fleet.Activate()

    expect(fleet.Ships[0].IsActive).toBeTruthy()
    expect(fleet.Ships[1].IsActive).toBeFalsy()
    expect(fleet.Ships[2].IsActive).toBeFalsy()

    expect(grid.ActiveShip).toBe(fleet.Ships[0])

    // should activate second ship
    fleet.Activate()

    expect(fleet.Ships[0].IsActive).toBeFalsy()
    expect(fleet.Ships[1].IsActive).toBeTruthy()
    expect(fleet.Ships[2].IsActive).toBeFalsy()

    expect(grid.ActiveShip).toBe(fleet.Ships[1])

    // should activate third ship
    fleet.Activate()

    expect(fleet.Ships[0].IsActive).toBeFalsy()
    expect(fleet.Ships[1].IsActive).toBeFalsy()
    expect(fleet.Ships[2].IsActive).toBeTruthy()

    expect(grid.ActiveShip).toBe(fleet.Ships[2])

    // should now activate the first one again
    fleet.Activate()

    expect(fleet.Ships[0].IsActive).toBeTruthy()
    expect(fleet.Ships[1].IsActive).toBeFalsy()
    expect(fleet.Ships[2].IsActive).toBeFalsy()

    expect(grid.ActiveShip).toBe(fleet.Ships[0])
  })
})
