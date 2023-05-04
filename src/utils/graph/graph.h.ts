import { IGraphNode } from './node.h'

export interface IGraph {
  GetCost(a: IGraphNode, b: IGraphNode): number
  GetNeighborsOf(node: IGraphNode): IGraphNode[]
}
