import { CanvasLayer } from '@/canvas-layer'
import { mockShipFactory, ShipDrawComponent } from '@/ship'

describe('>>> Node Ship Component', () => {
  let comp: ShipDrawComponent
  beforeEach(() => {
    comp = new ShipDrawComponent()
    comp.Entity = mockShipFactory()
  })

  it('should cleanup when awakens', () => {
    const spy = jest.spyOn(CanvasLayer.Foreground, 'ClearRect')
    expect(spy).not.toBeCalled()

    comp.Awake()

    expect(spy).toBeCalled()
  })

  it('should cleanup and draw rect every frame', () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Foreground, 'ClearRect')
    const spyFillRect = jest.spyOn(CanvasLayer.Foreground, 'FillCircle')

    expect(spyClearRect).not.toBeCalled()
    expect(spyFillRect).not.toBeCalled()

    comp.Update(0)

    expect(spyClearRect).toBeCalled()
    expect(spyFillRect).toBeCalled()
  })
})
