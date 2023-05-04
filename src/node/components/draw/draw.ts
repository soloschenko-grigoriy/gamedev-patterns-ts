import { IComponent, Color, Vector2D } from '@/utils'
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
      this.GetColor()
    )
  }

  private GetColor(): Color {
    if(this.Entity.IsOnPath){
      return Settings.grid.color.onPath
    }

    if(this.Entity.IsInLocomotionRange){
      return Settings.grid.color.inLocomotionRange
    }

    return Settings.grid.color.regular
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

    if (this.Entity.Ship) {
      CanvasLayer.Background.DrawText(
        'Ship',
        new Vector2D(entity.Start.x + 40, entity.Start.y),
        new Color(255, 0, 0, 1)
      )
    } else {
      CanvasLayer.Background.ClearRect(
        new Vector2D(entity.Start.x + 40, entity.Start.y - 10),
        new Vector2D(30, 10)
      )
    }
  }
}
