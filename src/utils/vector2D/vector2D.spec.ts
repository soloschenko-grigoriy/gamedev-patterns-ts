import { Vector2D } from './vector2D'

describe('>>> Vector2D', () => {
  describe('>> AsString', () => {
    it('should return stringified coordinates of the Vector2D', () => {
      expect(new Vector2D(0, 0).AsString()).toBe('(0,0)')
      expect(new Vector2D(5, 4).AsString()).toBe('(5,4)')
    })
  })

  describe('>> GetFromString', () => {
    it('should instantiate Vector2D by stringified value', () => {
      const point = Vector2D.FromString('(0,4)')
      expect(point.x).toBe(0)
      expect(point.y).toBe(4)
    })

    it('should throw error if instantiation is impossible', () => {
      expect(() => Vector2D.FromString('0')).toThrow()
    })
  })
})
