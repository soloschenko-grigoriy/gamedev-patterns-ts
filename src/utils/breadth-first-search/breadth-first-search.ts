import { IGraph } from './breadth-first-search.h'
import { Vector2D, Queue, Dictionary } from '@/utils'

export const BreadthFirstSearch = (graph: IGraph, start: Vector2D): Dictionary<Vector2D | null> => {
  const frontier = new Queue<Vector2D>()
  const path: Dictionary<Vector2D | null> = {
    [start.AsString()]: null
  }

  frontier.Enqueue(start)

  while (!frontier.IsEmpty) {
    const current = frontier.Dequeue()
    for (const next of graph.GetNeighborsForNodeWithIndex(current)) {
      if (!Object.prototype.hasOwnProperty.call(path, next.AsString())) {
        frontier.Enqueue(next)
        path[next.AsString()] = current
      }
    }
  }

  return path
}
