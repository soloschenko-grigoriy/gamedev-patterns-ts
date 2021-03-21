export class Vector2D {
  constructor(public x: number, public y: number) { }

  public static FromString(str: string): Vector2D {
    const parsed = str.replace(new RegExp(/\(|\)/, 'g'), '').split(',')
    const x = Number(parsed[0])
    const y = Number(parsed[1])

    if (isNaN(x) || isNaN(y)) {
      throw new Error(`Cannot instantiate Vector2D from string ${str}`)
    }

    return new Vector2D(x, y)
  }

  public AsString(): string {
    return `(${this.x},${this.y})`
  }
}
