import { Settings } from '@/settings'

export class Canvas {
  private static _instance: HTMLCanvasElement | null
  private static _ctx: CanvasRenderingContext2D | null

  private constructor() { /* make it unaccessible */ }

  public static GetInstance(): HTMLCanvasElement {
    if (!this._instance) {
      this._instance = this.CreateCanvas()
    }

    return this._instance
  }

  public static GetCtx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      this._ctx = this.GetInstance().getContext('2d')
    }

    if (!this._ctx) {
      throw new Error('Context identifier is not supported')
    }

    return this._ctx
  }

  private static CreateCanvas(): HTMLCanvasElement {
    const canvasSize = Canvas.GetCanvasSize()
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', canvasSize.toString())
    canvas.setAttribute('height', canvasSize.toString())

    document.body.appendChild(canvas)

    return canvas
  }

  private static GetCanvasSize(): number {
    return (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset
  }
}
