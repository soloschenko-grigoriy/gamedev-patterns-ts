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
      this.Entity.IsInLocomotionRange ? Settings.grid.color.inLocomotionRange : Settings.grid.color.regular
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

    if (this.Entity.Ship) {
      CanvasLayer.Background.DrawText(
        'Ship',
        new Vector2D(entity.Start.x + 40, entity.Start.y),
        new Color(255, 0, 0, 1)
      )
    }

    if (entity.Next) {
      const nextPosition = entity.Next.Index
      const position = entity.Index
      let text = ''
      if (nextPosition.x === position.x) {
        if (nextPosition.y > entity.Index.y) {
          text = 'V'
        } else {
          text = '^'
        }
      } else if (nextPosition.y === entity.Index.y) {
        if (nextPosition.x > entity.Index.x) {
          text = '>'
        } else {
          text = '<'
        }
      } else {
        throw new Error('Next is wrong')
      }

      CanvasLayer.Background.DrawText(
        text,
        new Vector2D(entity.Start.x + entity.Size.x / 2, entity.Start.y + entity.Size.y / 2),
        new Color(255, 0, 0, 1)
      )
    }
  }
}
