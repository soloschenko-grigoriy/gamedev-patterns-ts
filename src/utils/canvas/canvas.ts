import { IAwake, Vector2D } from '@/utils'

export class Canvas implements IAwake {
  private _elm: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D

  public get Element(): HTMLCanvasElement {
    return this._elm
  }

  public get Context(): CanvasRenderingContext2D {
    return this._ctx
  }

  constructor(public readonly Size: Vector2D) { }

  public Awake(): void {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', `${this.Size.x}px`)
    canvas.setAttribute('height', `${this.Size.y}px`)

    document.body.appendChild(canvas)
    this._elm = canvas

    const ctx = this._elm.getContext('2d')
    if (!ctx) {
      throw new Error('Context identifier is not supported')
    }

    this._ctx = ctx
  }

  public FillRect(start: Vector2D, size: Vector2D, color: string): void {
    this._ctx.beginPath()
    this._ctx.fillStyle = color
    this._ctx.rect(start.x, start.y, size.x, size.y)
    this._ctx.fill()
  }

  public ClearRect(start: Vector2D, size: Vector2D): void {
    this._ctx.clearRect(start.x, start.y, size.x, size.y)
  }
}

