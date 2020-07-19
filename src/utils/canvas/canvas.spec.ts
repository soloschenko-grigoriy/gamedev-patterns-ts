import { Canvas } from './canvas'
import { Vector2D } from '@/utils'

describe('>>> Canvas', () => {
  const size = new Vector2D(100, 100)
  let canvas: Canvas

  beforeEach(() => {
    canvas = new Canvas(size)
  })

  it('should create and attach canvas to the DOM when awakens', () => {
    const createElmSpy = jest.spyOn(document, 'createElement')
    const appendChildSpy = jest.spyOn(document.body, 'appendChild')

    expect(createElmSpy).not.toBeCalled()
    expect(appendChildSpy).not.toBeCalled()

    canvas.Awake()

    expect(createElmSpy).toBeCalled()
    expect(appendChildSpy).toBeCalled()
  })

  describe('>> API', () => {
    beforeEach(() => {
      canvas.Awake()
    })

    it('should draw and fill the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)
      const color = '#ffff00'

      const beginPathSpy = jest.spyOn(canvas.Context, 'beginPath')
      const rectSpy = jest.spyOn(canvas.Context, 'rect')
      const fillSpy = jest.spyOn(canvas.Context, 'fill')

      canvas.FillRect(start, size, color)

      expect(beginPathSpy).toBeCalled()
      expect(rectSpy).toBeCalledWith(start.x, start.y, size.x, size.y)
      expect(fillSpy).toBeCalled()
      expect(canvas.Context.fillStyle).toBe(color)
    })

    it('should clear the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)

      const spy = jest.spyOn(canvas.Context, 'clearRect')
      expect(spy).not.toBeCalled()

      canvas.ClearRect(start, size)

      expect(spy).toBeCalledWith(start.x, start.y, size.x, size.y)
    })
  })
})
