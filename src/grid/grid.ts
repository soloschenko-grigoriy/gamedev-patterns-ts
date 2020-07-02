import { Node } from '@/node'
import { Entity, Vector2D } from '@/utils'
import { Settings } from '@/settings'

export class Grid extends Entity {
  private _nodes: Node[] = []

  public get Nodes(): Node[] {
    return this._nodes
  }

  public Awake(): void {
    // awake components
    super.Awake()

    // prepare children
    this.Clear()
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


    const dimension = Settings.grid.dimension
    const size = Settings.grid.nodeSize
    const offset = Settings.grid.nodeOffset
    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        const start = new Vector2D(
          x * (size + offset) + offset,
          y * (size + offset) + offset
        )

        const end = new Vector2D(
          start.x + size,
          start.y + size
        )

        const index = new Vector2D(x, y)
        const node = new Node(start, end, index)

        this._nodes.push(node)
      }
    }
  }

  private Clear(): void {
    this.Nodes.splice(0)
  }
}
