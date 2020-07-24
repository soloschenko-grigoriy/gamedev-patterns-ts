import {
  Ship,
  mockShipFactory,
  ShipDrawComponent,
  ShipFlightComponent
} from '@/ship'

describe('>>> Ship', () => {
  let ship: Ship

  beforeEach(() => {
    ship = mockShipFactory()
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(ShipDrawComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(ShipDrawComponent.prototype, 'Update')

    const spyFlightCompAwake = jest.spyOn(ShipFlightComponent.prototype, 'Awake')
    const spyFlightCompUpdate = jest.spyOn(ShipFlightComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    expect(spyFlightCompAwake).not.toBeCalled()
    expect(spyFlightCompUpdate).not.toBeCalled()

    ship.Awake()
    expect(spyDrawCompAwake).toBeCalled()
    expect(spyFlightCompAwake).toBeCalled()

    ship.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
    expect(spyFlightCompUpdate).toBeCalled()
  })
})
