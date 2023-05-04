import {
  Ship,
  mockShipFactory,
  ShipDrawComponent
} from '@/ship'

describe('>>> Ship', () => {
  let ship: Ship

  beforeEach(() => {
    ship = mockShipFactory()
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(ShipDrawComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(ShipDrawComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    ship.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    ship.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
  })
})
