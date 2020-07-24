import { Color } from '@/utils'

describe('>>> Color', () => {
  it('should instantiate with provided values', () => {
    const rgba = new Color(1, 2, 3, 4)
    expect(rgba.R).toEqual(1)
    expect(rgba.G).toEqual(2)
    expect(rgba.B).toEqual(3)
    expect(rgba.A).toEqual(4)
  })

  it('should convert to string', () => {
    const rgba = new Color(1, 2, 3, 4)
    expect(rgba.AsString()).toBe('rgba(1, 2, 3, 4)')
  })

  it('should instantiate from string', () => {
    const rgba = Color.FromString('rgba(1, 2, 3, 4)')
    expect(rgba.R).toEqual(1)
    expect(rgba.G).toEqual(2)
    expect(rgba.B).toEqual(3)
    expect(rgba.A).toEqual(4)
  })

  it('should throw an error if cannot instantiate from string', () => {
    expect(() => Color.FromString('')).toThrow()
    expect(() => Color.FromString('?')).toThrow()
    expect(() => Color.FromString('rgba()')).toThrow()
    expect(() => Color.FromString('rgba(1)')).toThrow()
    expect(() => Color.FromString('rgba(1,2)')).toThrow()
    expect(() => Color.FromString('rgba(1,2,3)')).toThrow()
  })
})
