import { Vector2D } from '@/utils'
import { Node, NodeDrawComponent, mockNodeFactory } from '@/node'

describe('>>> Node', () => {
  const start = new Vector2D(1, 2)
  const end = new Vector2D(5, 6)
  const index = new Vector2D(1, 1)
  const neighborTop = mockNodeFactory(new Vector2D(1, 0))
  const neighborRight = mockNodeFactory(new Vector2D(1, 0))
  const neighborBottom = mockNodeFactory(new Vector2D(1, 0))
  const neighborLeft = mockNodeFactory(new Vector2D(1, 0))

  const neighbors = [
    neighborTop,
    neighborRight,
    neighborBottom,
    neighborLeft,
  ]

  let node: Node

  beforeEach(() => {
    node = mockNodeFactory(start, end, index, neighbors)
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    node.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    node.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
  })

  it('should calculate size', () => {
    expect(node.Size.x).toBe<number>(end.x - start.x)
    expect(node.Size.y).toBe<number>(end.y - start.y)
  })

  it('should calculate center point', () => {
    expect(node.Center.x).toBe<number>(start.x + node.Size.x / 2)
    expect(node.Center.y).toBe<number>(start.y + node.Size.y / 2)
  })

  it('should check if provided point is within occupied area', () => {
    expect(node.Occupies(new Vector2D(3, 2))).toBeTruthy()
    expect(node.Occupies(new Vector2D(6, 2))).toBeFalsy()
    expect(node.Occupies(new Vector2D(3, 7))).toBeFalsy()
  })

  it('should find and set inLocomotionRange', () => {
    expect(neighborTop.IsInLocomotionRange).toBeFalsy()
    expect(neighborRight.IsInLocomotionRange).toBeFalsy()
    expect(neighborBottom.IsInLocomotionRange).toBeFalsy()
    expect(neighborLeft.IsInLocomotionRange).toBeFalsy()
    node.FindAndSetInLocomotionRange(2)
    expect(neighborTop.IsInLocomotionRange).toBeTruthy()
    expect(neighborRight.IsInLocomotionRange).toBeTruthy()
    expect(neighborBottom.IsInLocomotionRange).toBeTruthy()
    expect(neighborLeft.IsInLocomotionRange).toBeTruthy()
  })
})
