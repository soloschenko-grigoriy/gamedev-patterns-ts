import { Vector2D } from '@/utils'

export interface IGraph {
  GetNeighborsForNodeWithIndex(index: Vector2D): Vector2D[]
}
