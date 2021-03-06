import { Vector2D, Color, Canvas } from '@/utils'

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

      const beginPathSpy = jest.spyOn(canvas.Context, 'beginPath')
      const rectSpy = jest.spyOn(canvas.Context, 'rect')
      const fillSpy = jest.spyOn(canvas.Context, 'fill')

      canvas.FillRect(start, size, new Color(255, 255, 255, 1))

      expect(beginPathSpy).toBeCalled()
      expect(rectSpy).toBeCalledWith(start.x, start.y, size.x, size.y)
      expect(fillSpy).toBeCalled()
      expect(canvas.Context.fillStyle).toBe<string>('#ffffff')
    })

    it('should clear the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)

      const spy = jest.spyOn(canvas.Context, 'clearRect')
      expect(spy).not.toBeCalled()

      canvas.ClearRect(start, size)

      expect(spy).toBeCalledWith(start.x, start.y, size.x, size.y)
    })

    it('should draw and fill the circle', () => {
      const center = new Vector2D(0, 0)
      const radius = 1

      const beginPathSpy = jest.spyOn(canvas.Context, 'beginPath')
      const arcSpy = jest.spyOn(canvas.Context, 'arc')
      const fillSpy = jest.spyOn(canvas.Context, 'fill')

      canvas.FillCircle(center, radius, new Color(255, 255, 255, 1))

      expect(beginPathSpy).toBeCalled()
      expect(arcSpy).toBeCalledWith(center.x, center.y, radius, 0, Math.PI * 2)
      expect(fillSpy).toBeCalled()
      expect(canvas.Context.fillStyle).toBe('#ffffff')
    })

    it('should set css style', () => {
      const zIndex = '1'
      expect(canvas.Element.style.zIndex).not.toBe<string>(zIndex)

      canvas.SetStyle({ zIndex })

      expect(canvas.Element.style.zIndex).toBe<string>(zIndex)
    })

    it('should draw the text', () => {
      const text = 'text'
      const position = new Vector2D(0, 0)
      const color = new Color(255, 10, 20, 1)

      const spy = jest.spyOn(canvas.Context, 'fillText')

      expect(spy).not.toBeCalled()

      canvas.DrawText(text, position, color)

      expect(spy).toBeCalledWith(text, position.x, position.y)
    })

    describe('>>> calculate local point by global', () => {
      beforeEach(() => {
        canvas.Element.getBoundingClientRect = jest.fn().mockReturnValue({
          top: 20,
          left: 20,
          width: 500,
          height: 500
        })
      })

      it('should return null if point is out of canvas boundaries', () => {
        expect(canvas.CalcLocalPointFrom(new Vector2D(0, 0))).toBeNull()
        expect(canvas.CalcLocalPointFrom(new Vector2D(541, 400))).toBeNull()
        expect(canvas.CalcLocalPointFrom(new Vector2D(400, 541))).toBeNull()
      })

      it('should return local point otherwise', () => {
        expect(canvas.CalcLocalPointFrom(new Vector2D(200, 300))).toEqual(new Vector2D(180, 280))
      })
    })
  })
})
