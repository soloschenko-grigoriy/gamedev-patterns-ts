import { Entity, IComponent, Vector2D } from '@/utils'

export abstract class OnclickComponent implements IComponent {
  public abstract Entity: Entity | null

  public abstract Awake(): void

  public abstract Update(deltaTime: number): void

  public abstract ClickOn(point: Vector2D): void
}
