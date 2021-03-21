import { IComponent, Color } from '@/utils'
import { Node } from '@/node'
import { Settings } from '@/settings'
import { CanvasLayer } from '@/canvas-layer'

export class NodeDrawComponent implements IComponent {
  public Entity: Node

  public Awake(): void {
    this.Clear()
  }

  public Update(deltaTime: number): void {
    this.Clear()
    this.Draw()
    this.DrawDebugInfo()
  }

  private Draw(): void {
    CanvasLayer.Background.FillRect(
      this.Entity.Start,
      this.Entity.Size,
      this.Entity.IsActive ? Settings.grid.color.active : Settings.grid.color.regular
    )
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.Size)
  }

  private DrawDebugInfo(): void {
    if (!Settings.debugMode) {
      return
    }

    const entity = this.Entity
    CanvasLayer.Background.DrawText(
      entity.Index.AsString(),
      entity.Start,
      new Color(255, 0, 0, 1)
    )
  }
}
