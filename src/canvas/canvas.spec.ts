import { Canvas } from './canvas'

describe('>>> Canvas', () => {
  it('should create canvas only once', () => {
    const spy = jest.spyOn(document, 'createElement')

    expect(document.createElement).not.toBeCalled()

    const canvas1 = Canvas.GetInstance()
    const canvas2 = Canvas.GetInstance()

    const ctx1 = Canvas.GetCtx()
    const ctx2 = Canvas.GetCtx()

    expect(canvas1).toBe(canvas2)
    expect(ctx1).toBe(ctx2)
    expect(spy).toBeCalledTimes(1)
  })
})
