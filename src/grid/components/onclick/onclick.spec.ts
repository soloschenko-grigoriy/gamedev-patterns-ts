import { Grid } from '@/grid/grid'
import { GridOnclickComponent } from './onclick'
import { Vector2D } from '@/utils'

describe('>>> Grid Click Component', () => {
  let comp: GridOnclickComponent

  beforeEach(() => {
    comp = new GridOnclickComponent()
    comp.Entity = new Grid()
    comp.Entity.Awake()
  })

  it('should update node if user click within it\'s range', () => {
    comp.ClickOn(new Vector2D(100, 100))
    expect(comp.Entity.Nodes[0].IsActive).toBeTruthy()
    expect(comp.Entity.Nodes[1].IsActive).toBeFalsy()
  })
})
