import { NodeDrawComponent } from './draw'
import { Canvas } from '@/canvas'
import { mockNodeFactory } from '@/node'

describe('>>> Node Draw Component', () => {
  let comp: NodeDrawComponent
  beforeEach(() => {
    comp = new NodeDrawComponent()
    comp.Entity = mockNodeFactory()
  })

  it('should cleanup when awakens', () => {
    const spy = jest.spyOn(Canvas.GetCtx(), 'clearRect')
    expect(spy).not.toBeCalled()

    comp.Awake()

    expect(spy).toBeCalled()
  })

  it('should cleanup and draw rect every frame', () => {
    const spyClearRect = jest.spyOn(Canvas.GetCtx(), 'clearRect')
    const spyRect = jest.spyOn(Canvas.GetCtx(), 'rect')
    const spyFill = jest.spyOn(Canvas.GetCtx(), 'fill')

    expect(spyClearRect).not.toBeCalled()
    expect(spyRect).not.toBeCalled()
    expect(spyFill).not.toBeCalled()

    comp.Update(0)

    expect(spyClearRect).toBeCalled()
    expect(spyRect).toBeCalled()
    expect(spyFill).toBeCalled()
  })
})
