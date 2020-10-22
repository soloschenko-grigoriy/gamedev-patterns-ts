import { CanvasLayer } from '@/canvas-layer'
import { Game, mockGameFactory } from '@/game'
import { Grid, mockGridFactory } from '@/grid'
import { OnclickComponent, Vector2D } from '@/utils'
import { GameInputComponent } from './input'

describe('>>> Game Input Component', () => {
  let comp: GameInputComponent
  let grid: Grid
  let game: Game

  beforeEach(() => {
    grid = mockGridFactory()
    game = mockGameFactory(grid)
    comp = new GameInputComponent()

    game.AddComponent(comp)
  })

  it('should handle click', () => {
    const point = new Vector2D(200, 200)

    game.Awake()
    CanvasLayer.Background.CalcLocalPointFrom = jest.fn().mockReturnValueOnce(point)

    const spy = jest.spyOn(grid.GetComponent(OnclickComponent), 'ClickOn')

    expect(spy).not.toBeCalled()

    document.body.dispatchEvent(new MouseEvent('click'))

    expect(spy).toBeCalledWith(point)
  })
})
