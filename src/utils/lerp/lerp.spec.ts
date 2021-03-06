import { Lerp } from './lerp'

describe('>>> Lerp', () => {
  it('should linearly interpolate between two values', () => {
    expect(Lerp(0, 50, 0.5)).toBe(25)
    expect(Lerp(20, 80, 0)).toBe(20)
  })
})
