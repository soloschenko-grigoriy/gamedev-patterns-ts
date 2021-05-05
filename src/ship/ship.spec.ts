import { mockFleetFactory } from '@/fleet'
import { mockNodeFactory } from '@/node'
import { Settings } from '@/settings'
import {
  Ship,
  mockShipFactory,
  ShipDrawComponent,
  ShipLocomotionComponent
} from '@/ship'

describe('>>> Ship', () => {
  let ship: Ship
  const locomotionComponent = new ShipLocomotionComponent(mockNodeFactory())
  const drawComponent = new ShipDrawComponent()

  beforeEach(() => {
    ship = mockShipFactory(mockFleetFactory(), locomotionComponent, drawComponent)
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(drawComponent, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(drawComponent, 'Update')

    const spyLocomotionCompAwake = jest.spyOn(locomotionComponent, 'Awake')
    const spyLocomotionCompUpdate = jest.spyOn(locomotionComponent, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    expect(spyLocomotionCompAwake).not.toBeCalled()
    expect(spyLocomotionCompUpdate).not.toBeCalled()

    ship.Awake()
    expect(spyDrawCompAwake).toBeCalled()
    expect(spyLocomotionCompAwake).toBeCalled()

    ship.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
    expect(spyLocomotionCompUpdate).toBeCalled()
  })

  it('should highlight node in range when ship gets activated', () => {
    const spy = jest.spyOn(locomotionComponent.Node, 'FindAndSetInLocomotionRange')
    expect(spy).not.toBeCalled()
    ship.IsActive = true
    expect(spy).toBeCalledWith(Settings.ships.locomotion.range)
  })
})
