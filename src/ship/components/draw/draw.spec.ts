import { CanvasLayer } from '@/canvas-layer'
import { mockFleetFactory } from '@/fleet'
import { mockNodeFactory } from '@/node'
import { Ship, ShipDrawComponent, mockShipFactory, ShipLocomotionComponent } from '@/ship'

describe('>>> Node Ship Component', () => {
  const comp = new ShipDrawComponent()
  const node = mockNodeFactory()
  const locomotionComp = new ShipLocomotionComponent(node)
  let ship: Ship
  beforeEach(() => {
    comp.Entity = mockShipFactory()
    ship = mockShipFactory(
      mockFleetFactory(),
      locomotionComp,
      comp
    )
    ship.Awake()
  })

  it('should draw rect every frame', () => {
    const spyFillRect = jest.spyOn(CanvasLayer.Foreground, 'FillCircle')

    expect(spyFillRect).not.toBeCalled()

    comp.Update(0)

    expect(spyFillRect).toBeCalled()
  })

  it('should cleanup if ship moves', () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Foreground, 'ClearRect')
    const spyFillRect = jest.spyOn(CanvasLayer.Foreground, 'FillCircle')

    ship.IsActive = true
    node.Next = mockNodeFactory()
    expect(spyClearRect).not.toBeCalled()
    expect(spyFillRect).not.toBeCalled()

    locomotionComp.Update(0)
    comp.Update(0)

    expect(spyClearRect).toBeCalled()
    expect(spyFillRect).toBeCalled()
  })
})
