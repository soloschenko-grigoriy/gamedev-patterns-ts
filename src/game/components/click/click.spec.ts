import { CanvasLayer } from '@/canvas-layer'
import { Game, mockGameFactory } from '@/game'
import { Grid, mockGridFactory } from '@/grid'
import { ClickComponent, Vector2D } from '@/utils'
import { GameClickComponent } from './click'

describe('>>> Game', () => {
  let comp: GameClickComponent
  let grid: Grid
  let game: Game

  beforeEach(() => {
    grid = mockGridFactory()
    game = mockGameFactory(grid)
    comp = new GameClickComponent()

    game.AddComponent(comp)
  })

  it('should handle click', () => {
    const point = new Vector2D(200, 200)

    game.Awake()
    CanvasLayer.Background.GetLocalPointOf = jest.fn().mockReturnValueOnce(point)

    const spy = jest.spyOn(grid.GetComponent(ClickComponent), 'ClickOn')

    expect(spy).not.toBeCalled()

    document.body.dispatchEvent(new MouseEvent('click'))

    expect(spy).toBeCalledWith(point)
  })
})
