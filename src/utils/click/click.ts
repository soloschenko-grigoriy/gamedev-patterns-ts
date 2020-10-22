import { Entity, IComponent, Vector2D } from '@/utils'

export abstract class ClickComponent implements IComponent {
  public Entity: Entity | null

  public abstract Awake(): void

  public abstract Update(deltaTime: number): void

  public abstract ClickOn(point: Vector2D): void
}
