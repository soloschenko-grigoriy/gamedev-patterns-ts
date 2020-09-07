export class Color {
  public readonly R: number
  public readonly G: number
  public readonly B: number
  public readonly A: number

  public static IsValidChannel(v: number, isAlpha = false): boolean {
    const max = isAlpha ? 1 : 255
    if (v < 0 || v > max) {
      return false
    }

    if (!isAlpha && v % 1 !== 0) {
      return false
    }

    return true
  }

  constructor(r: number, g: number, b: number, a: number) {
    if (!Color.IsValidChannel(r)) {
      throw new Error('Provided incorrect value for Red channel')
    }

    if (!Color.IsValidChannel(g)) {
      throw new Error('Provided incorrect value for Green channel')
    }

    if (!Color.IsValidChannel(b)) {
      throw new Error('Provided incorrect value for Blue channel')
    }

    if (!Color.IsValidChannel(a, true)) {
      throw new Error('Provided incorrect value for Alpha channel')
    }

    this.R = r
    this.G = g
    this.B = b
    this.A = a
  }

  public AsString(): string {
    return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`
  }

  public static FromString(str: string): Color {
    const arr = str
      .replace(new RegExp(/\(|\)|[A-Za-z]/g), '')
      .split(',')

    const
      r = Number(arr[0]),
      g = Number(arr[1]),
      b = Number(arr[2]),
      a = Number(arr[3])

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error('Invalid string')
    }

    return new Color(r, g, b, a)
  }
}
