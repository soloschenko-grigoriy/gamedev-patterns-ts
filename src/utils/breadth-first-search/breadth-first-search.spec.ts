import { IGraph } from './breadth-first-search.h'
import { BreadthFirstSearch } from './breadth-first-search'
import { Vector2D, Dictionary } from '@/utils'

describe('>>> Breadth First Search', () => {
  class Graph implements IGraph {
    readonly Edges: Dictionary<Vector2D[] | null>

    constructor(edges: Dictionary<Vector2D[] | null>) {
      this.Edges = edges
    }

    public GetNeighborsForNodeWithIndex(node: Vector2D): Vector2D[] {
      const neighbors = this.Edges[node.AsString()]
      if (!neighbors) {
        throw new Error('No neighbors')
      }

      return neighbors
    }
  }

  it('should return path to the desired point', () => {
    const a = new Vector2D(0, 0)
    const b = new Vector2D(1, 0)
    const c = new Vector2D(0, 1)
    const d = new Vector2D(1, 1)

    const data = {
      [a.AsString()]: [b, c],
      [b.AsString()]: [a, d],
      [c.AsString()]: [a, d],
      [d.AsString()]: [b, c]
    }

    expect(BreadthFirstSearch(new Graph(data), a)).toStrictEqual({
      '(0,0)': null,
      '(0,1)': a,
      '(1,0)': a,
      '(1,1)': b
    })

    expect(BreadthFirstSearch(new Graph(data), b)).toStrictEqual({
      '(0,0)': b,
      '(0,1)': a,
      '(1,0)': null,
      '(1,1)': b
    })
  })
})
