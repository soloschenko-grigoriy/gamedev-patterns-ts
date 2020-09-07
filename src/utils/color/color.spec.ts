import { Color } from './color'

describe('>>> Color', () => {
  it('should instantiate with provided values', () => {
    const rgba = new Color(1, 2, 3, 0.1)
    expect(rgba.R).toEqual(1)
    expect(rgba.G).toEqual(2)
    expect(rgba.B).toEqual(3)
    expect(rgba.A).toEqual(0.1)
  })

  it('should throw an error if provided values are incorrect', () => {
    expect(() => new Color(266, 2, 3, 0.1)).toThrowError(/Red/)
    expect(() => new Color(-1, 2, 3, 0.1)).toThrow(/Red/)
    expect(() => new Color(1.3, 2, 3, 0.1)).toThrow(/Red/)

    expect(() => new Color(255, 266, 3, 0.1)).toThrow(/Green/)
    expect(() => new Color(255, -1, 3, 0.1)).toThrowError(/Green/)
    expect(() => new Color(255, 2.5, 3, 0.1)).toThrowError(/Green/)

    expect(() => new Color(255, 25, 266, 0.1)).toThrowError(/Blue/)
    expect(() => new Color(255, 25, -2, 0.1)).toThrowError(/Blue/)
    expect(() => new Color(255, 0, 2.5, 0.1)).toThrowError(/Blue/)

    expect(() => new Color(255, 255, 255, -1)).toThrowError(/Alpha/)
    expect(() => new Color(255, 255, 255, 1.2)).toThrowError(/Alpha/)
  })

  it('should convert to string', () => {
    const rgba = new Color(1, 2, 3, 0.1)
    expect(rgba.AsString()).toBe('rgba(1, 2, 3, 0.1)')
  })

  it('should instantiate from string', () => {
    const rgba = Color.FromString('rgba(1, 2, 3, 0.1)')
    expect(rgba.R).toEqual(1)
    expect(rgba.G).toEqual(2)
    expect(rgba.B).toEqual(3)
    expect(rgba.A).toEqual(0.1)
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
