import { Node } from '@/node'
import { Settings } from '@/settings'
import { GridOnclickComponent } from './components'
import { Grid, mockGridFactory } from '@/grid'
import { mockShipFactory } from '@/ship'
import { mockFleetFactory } from '@/fleet'
import { Vector2D } from '@/utils'

describe('>>> Grid', () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension
  let grid: Grid

  beforeEach(() => {
    grid = mockGridFactory()
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(GridOnclickComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(GridOnclickComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    grid.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    grid.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
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

  describe('Determine path to', () => {
    let destination: Node
    beforeEach(() => {
      grid.Awake()
      destination = grid.Nodes[grid.Nodes.length - 1]
    })

    it('should NOT calculate path if there is no currently active ship', () => {
      grid.ActiveShip = null

      grid.DeterminePathTo(destination)

      expect(grid.Nodes.some(node => node.IsOnPath)).toBeFalsy()
    })

    it('should calculate path if there is currently active ship', () => {
      grid.ActiveShip = mockShipFactory(mockFleetFactory(), grid.Nodes[0])

      grid.DeterminePathTo(destination)

      const path = grid.Nodes.filter(node => node.IsOnPath)
      expect(path[0].Index).toStrictEqual(new Vector2D(1, 0))
      expect(path[1].Index).toStrictEqual(new Vector2D(2, 0))
      expect(path[2].Index).toStrictEqual(new Vector2D(3, 0))
      expect(path[3].Index).toStrictEqual(new Vector2D(4, 0))
      expect(path[4].Index).toStrictEqual(new Vector2D(5, 0))
      expect(path[5].Index).toStrictEqual(new Vector2D(5, 1))
      expect(path[6].Index).toStrictEqual(new Vector2D(5, 2))
      expect(path[7].Index).toStrictEqual(new Vector2D(5, 3))
      expect(path[8].Index).toStrictEqual(new Vector2D(5, 4))
      expect(path[9].Index).toStrictEqual(new Vector2D(5, 5))
    })
  })
})
