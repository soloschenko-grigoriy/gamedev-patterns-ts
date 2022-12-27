import { GridOnclickComponent } from './onclick'
import { Vector2D } from '@/utils'
import { mockGridFactory } from '@/grid'

describe('>>> Grid Click Component', () => {
  let comp: GridOnclickComponent

  beforeEach(() => {
    comp = new GridOnclickComponent()
    comp.Entity = mockGridFactory()
    comp.Entity.Awake()
  })

  it('should update node if user click within it\'s range', () => {
    const spy = jest.spyOn(comp.Entity, 'DeterminePathTo')

    comp.Entity.Nodes[0].IsInLocomotionRange = true

    comp.ClickOn(new Vector2D(100, 100))

    expect(spy).toBeCalledWith(comp.Entity.Nodes[0])
  })
})
