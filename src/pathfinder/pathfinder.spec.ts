import { IGraph, Vector2D, IGraphNode } from '@/utils'
import { Pathfinder } from './pathfinder'

describe('>>> Pathfinder', () => {
  class GraphNode implements IGraphNode {
    public get Position(): Vector2D {
      return this._position
    }

    constructor(private readonly _position: Vector2D){}
  }

  class Graph implements IGraph {
    constructor(private readonly _edges: Record<string, GraphNode[] | null>) {}

    public GetCost(a: IGraphNode, b: IGraphNode): number {
      if(a.Position.x === 1 && a.Position.y === 0 && b.Position.x === 2 && a.Position.y === 0){
        return 2
      }

      return 1
    }

    public GetNeighborsOf(node: GraphNode): GraphNode[] {
      const neighbors = this._edges[node.Position.AsString()]
      if (!neighbors) {
        throw new Error('No neighbors')
      }

      return neighbors
    }
  }

  // first row
  const node00 = new GraphNode(new Vector2D(0, 0))
  const node10 = new GraphNode(new Vector2D(1, 0))
  const node20 = new GraphNode(new Vector2D(2, 0))

  // second row
  const node01 = new GraphNode(new Vector2D(0, 1))
  const node11 = new GraphNode(new Vector2D(1, 1))
  const node21 = new GraphNode(new Vector2D(2, 1))

  // third row
  const node02 = new GraphNode(new Vector2D(0, 2))
  const node12 = new GraphNode(new Vector2D(1, 2))
  const node22 = new GraphNode(new Vector2D(2, 2))

  const edges = {
    [node00.Position.AsString()]: [node10, node01],
    [node10.Position.AsString()]: [node00, node20, node11],
    [node20.Position.AsString()]: [node10, node21],

    [node01.Position.AsString()]: [node00, node11, node02],
    [node11.Position.AsString()]: [node10, node01, node21, node12],
    [node21.Position.AsString()]: [node20, node11, node22],

    [node02.Position.AsString()]: [node01, node12],
    [node12.Position.AsString()]: [node02, node11, node22],
    [node22.Position.AsString()]: [node21, node12],
  }

  const heuristic = (a: IGraphNode, b: IGraphNode): number => Math.abs(a.Position.x - b.Position.x) + Math.abs(a.Position.y - b.Position.y)
  const graph = new Graph(edges)
  const pathfinder = new Pathfinder(graph, heuristic)

  it('should calculate path from point A to point B', () => {
    expect(pathfinder.CalculatePath(node00, node22)).toStrictEqual([
      node10, node11, node21, node22
    ])
  })
})
