import { Game } from '@/game'
import { Entity } from '@/utils'

jest.useFakeTimers()

class E1 extends Entity { }
class E2 extends Entity { }
class E3 extends Entity { }

describe('>>> Game', () => {
  let game: Game
  const e1 = new E1()
  const e2 = new E2()
  const e3 = new E3()

  beforeEach(() => {
    game = new Game()
    game.Entities.push(e1, e2, e3)
    window.requestAnimationFrame = jest.fn().mockImplementationOnce((cb) => cb())
  })

  it('should start update loop next frame after awake', () => {
    game.Awake()
    game.Update = jest.fn()

    jest.runAllTimers()

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(game.Update).toHaveBeenCalledTimes(1)
  })

  it('should awake all children', () => {
    const spy1 = jest.spyOn(e1, 'Awake')
    const spy2 = jest.spyOn(e2, 'Awake')
    const spy3 = jest.spyOn(e3, 'Awake')

    expect(spy1).not.toBeCalled()
    expect(spy2).not.toBeCalled()
    expect(spy3).not.toBeCalled()

    game.Awake()

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
    expect(spy3).toBeCalled()
  })

  it('should update all children', () => {
    const spy1 = jest.spyOn(e1, 'Update')
    const spy2 = jest.spyOn(e2, 'Update')
    const spy3 = jest.spyOn(e3, 'Update')

    expect(spy1).not.toBeCalled()
    expect(spy2).not.toBeCalled()
    expect(spy3).not.toBeCalled()

    game.Update()

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
    expect(spy3).toBeCalled()
  })
})
