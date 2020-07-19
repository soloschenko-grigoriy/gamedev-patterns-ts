import { Entity } from '@/utils'
import { Node } from '@/node'

export class Grid extends Entity {
  private _nodes: Node[] = []

  public get Nodes(): Node[] {
    return this._nodes
  }

  public Awake(): void {
    // awake components
    super.Awake()

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
}
