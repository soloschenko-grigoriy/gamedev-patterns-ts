import { Entity } from './entity'
import { IComponent } from './component.h'

class E extends Entity { }
class C1 implements IComponent {
  public Entity: E
}
class C2 implements IComponent {
  public Entity: E
}
class C3 implements IComponent {
  public Entity: E
}

describe('>>> Entity', () => {
  let e: E
  const c1 = new C1()
  const c2 = new C2()
  const c3 = new C3()

  beforeEach(() => {
    e = new E()
  })

  it('should add, remove, get, and check components', () => {
    expect(e.Components.length).toBe(0)
    e.AddComponent(c1)
    e.AddComponent(c2)
    e.AddComponent(c3)

    expect(e.Components.length).toBe(3)
    expect(e.Components[0]).toBe(c1)
    expect(e.Components[1]).toBe(c2)
    expect(e.Components[2]).toBe(c3)

    e.RemoveComponent(C2)
    expect(e.Components.length).toBe(2)
    expect(e.Components[0]).toBe(c1)
    expect(e.Components[1]).toBe(c3)

    expect(e.GetComponent(C1)).toBe(c1)
    expect(e.GetComponent(C3)).toBe(c3)

    expect(e.HasComponent(C1)).toBeTruthy()
    expect(e.HasComponent(C3)).toBeTruthy()
  })

  it('should throw error if component wasn\'t found', () => {
    expect(e.HasComponent(C1)).toBeFalsy()
    expect(() => e.GetComponent(C1)).toThrow()
  })
})
