import { CanvasLayer } from '@/canvas-layer'
import { Game } from '@/game'
import { IComponent, Vector2D, OnclickComponent } from '@/utils'

export class GameInputComponent implements IComponent {
  public Entity: Game

  public Awake(): void {
    document.body.addEventListener('click', this.HandleClick.bind(this))
  }

  public Update(deltaTime: number): void {
    // @todo
  }

  private HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.CalcLocalPointFrom(new Vector2D(e.clientX, e.clientY))
    if (!point) {
      return
    }

    for (const entity of this.Entity.Entities) {
      if (!entity.HasComponent(OnclickComponent)) {
        continue
      }

      entity.GetComponent(OnclickComponent).ClickOn(point)
    }
  }
}
