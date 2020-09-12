import {
  Ship,
  mockShipFactory,
  ShipDrawComponent,
  ShipLocomotionComponent
} from '@/ship'

describe('>>> Ship', () => {
  let ship: Ship

  beforeEach(() => {
    ship = mockShipFactory()
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(ShipDrawComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(ShipDrawComponent.prototype, 'Update')

    const spyLocomotionCompAwake = jest.spyOn(ShipLocomotionComponent.prototype, 'Awake')
    const spyLocomotionCompUpdate = jest.spyOn(ShipLocomotionComponent.prototype, 'Update')

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
})
