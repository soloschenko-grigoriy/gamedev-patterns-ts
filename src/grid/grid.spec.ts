import { Grid } from './grid'
import { Node } from '@/node'
import { Settings } from '@/settings'

describe('>>> Grid', () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension
  let grid: Grid

  beforeEach(() => {
    grid = new Grid()
  })

  it('should init and cleanups nodes', () => {
    expect(grid.Nodes.length).toBe(0)

    grid.Awake()
    expect(grid.Nodes.length).toBe<number>(nodeCount)

    grid.Awake()
    expect(grid.Nodes.length).toBe<number>(nodeCount)
  })

  it('should awake and update all children', () => {
    const spyNodeAwake = jest.spyOn(Node.prototype, 'Awake')
    const spyNodeUpdate = jest.spyOn(Node.prototype, 'Update')

    expect(spyNodeAwake).not.toBeCalled()
    expect(spyNodeUpdate).not.toBeCalled()

    grid.Awake()
    expect(spyNodeAwake).toBeCalledTimes(nodeCount)

    grid.Update(0)
    expect(spyNodeUpdate).toBeCalledTimes(nodeCount)
  })
})
