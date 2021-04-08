import { Entity, Vector2D } from '@/utils'
import { Node } from '@/node'
import { Settings } from '@/settings'
import { GridOnclickComponent } from './components'

export class Grid extends Entity {
  private _nodes: Node[] = []

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
