export class Color {
  constructor(
    public readonly R: number,
    public readonly G: number,
    public readonly B: number,
    public readonly A: number
  ) { }

  public static FromString(str: string): Color {
    str = str.replace(new RegExp(/\(|\)|[A-Za-z]/g), '')
    const arr = str.split(',')
    const r = Number(arr[0])
    const g = Number(arr[1])
    const b = Number(arr[2])
    const a = Number(arr[3])
    if (!r || !g || !b || !a) {
      throw new Error('Invalid RGBA string provided')
    }

    return new Color(Number(arr[0]), Number(arr[1]), Number(arr[2]), Number(arr[3]))
  }

  public AsString(): string {
    return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`
  }
}

