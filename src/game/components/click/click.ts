import { CanvasLayer } from '@/canvas-layer'
import { Game } from '@/game'
import { ClickComponent, IComponent, Vector2D } from '@/utils'

export class GameClickComponent implements IComponent {
  Entity: Game

  public Awake(): void {
    document.body.addEventListener('click', this.HandleClick.bind(this))
  }

  public Update(deltaTime: number): void {
    // @todo
  }

  private HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.GetLocalPointOf(new Vector2D(e.clientX, e.clientY))
    if (!point) {
      return
    }

    for (const entity of this.Entity.Entities) {
      if (!entity.HasComponent(ClickComponent)) {
        continue
      }

      entity.GetComponent(ClickComponent).ClickOn(point)
    }
  }
}
