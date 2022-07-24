import { Entity, Vector2D, IGraph, IGraphNode } from '@/utils'
import { Node } from '@/node'
import { Settings } from '@/settings'
import { Pathfinder } from '@/pathfinder'
import { Ship } from '@/ship'
import { GridOnclickComponent } from './components'

export class Grid extends Entity implements IGraph {
  private _nodes: Node[] = []
  private _pathfinder = new Pathfinder(this, Grid.Heuristic)
  private _currentPath: Node[] = []

  public static Heuristic = (a: IGraphNode, b: IGraphNode): number => Math.abs(a.Position.x - b.Position.x) + Math.abs(a.Position.y - b.Position.y)

  public ActiveShip: Ship | null = null

  public get Nodes(): Node[] {
    return this._nodes
  }

  public Awake(): void {
    this.AddComponent(new GridOnclickComponent())

    // awake components
    super.Awake()

    // prepare children
    this.InitNodes()

    // awake children
    for (const node of this._nodes) {
      node.Awake()
    }
  }

  public Update(deltaTime: number): void {
    // update components
    super.Update(deltaTime)

    // update children
    for (const node of this._nodes) {
      node.Update(deltaTime)
    }
  }

  public GetCost(a: Node, b: Node): number {
    return 1
  }

  public GetNeighborsOf(node: Node): Node[] {
    return node.Neighbors
  }

  public DeterminePathTo(node: Node): void {
    this._currentPath.forEach(item => item.IsOnPath = false)

    if(!this.ActiveShip){
      return
    }

    this._currentPath = this._pathfinder.CalculatePath(this.ActiveShip.Node, node) as Node[]
    this._currentPath.forEach(item => item.IsOnPath = true)
  }

  private InitNodes(): void {
    const size = Settings.grid.nodeSize
    const offset = Settings.grid.nodeOffset
    for (let y = 0; y < Settings.grid.dimension; y++) {
      for (let x = 0; x < Settings.grid.dimension; x++) {
        const start = new Vector2D(
          x * (size + offset) + offset,
          y * (size + offset) + offset
        )

        const end = new Vector2D(
          start.x + size,
          start.y + size
        )

        const index = new Vector2D(x, y)

        const top = this.Nodes.find(node => node.Index.x === index.x && node.Index.y === index.y - 1)
        const left = this.Nodes.find(node => node.Index.x === index.x - 1 && node.Index.y === index.y)

        const neighbors: Node[] = []
        const node = new Node(start, end, index, neighbors)

        if (left) {
          neighbors.push(left)
          left.Neighbors.push(node)
        }

        if (top) {
          neighbors.push(top)
          top.Neighbors.push(node)
        }

        this._nodes.push(node)
      }
    }
  }
}
