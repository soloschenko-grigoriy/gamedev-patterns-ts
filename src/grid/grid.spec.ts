import { Node } from '@/node'
import { Settings } from '@/settings'
import { GridOnclickComponent } from './components'
import { Grid, mockGridFactory } from '@/grid'

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
})
