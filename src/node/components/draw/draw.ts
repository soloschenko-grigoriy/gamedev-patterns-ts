import { IComponent } from '@/utils'
import { Node } from '@/node'
import { Canvas } from '@/canvas'
import { Settings } from '@/settings'

export class NodeDrawComponent implements IComponent {
  public Entity: Node

  private get Ctx(): CanvasRenderingContext2D {
    return Canvas.GetCtx()
  }

  private get Color(): string {
    return Settings.grid.color
  }

  public Awake(): void {
    this.Clear()
  }

  public Update(deltaTime: number): void {
    this.Clear()
    this.Draw()
  }

  private Clear(): void {
    this.Ctx.clearRect(this.Entity.Start.x, this.Entity.Start.y, this.Entity.Width, this.Entity.Height)
  }

  private Draw(): void {
    this.Ctx.beginPath()
    this.Ctx.fillStyle = this.Color
    this.Ctx.rect(this.Entity.Start.x, this.Entity.Start.y, this.Entity.Width, this.Entity.Height)
    this.Ctx.fill()
  }
}
