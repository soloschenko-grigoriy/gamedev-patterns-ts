import { IComponent } from './component.h'
import { IAwake, IUpdate } from '@/utils'

type AbstractComponent<T> = Function & { prototype: T }

type constr<T> = AbstractComponent<T> | { new(...args: unknown[]): T }

export abstract class Entity implements IAwake, IUpdate {
  protected _components: IComponent[] = []

  public get Components(): IComponent[] {
    return this._components
  }

  public AddComponent(component: IComponent): void {
    this._components.push(component)
    component.Entity = this
  }

  public GetComponent<C extends IComponent>(constr: constr<C>): C {
    for (const component of this._components) {
      if (component instanceof constr) {
        return component as C
      }
    }
    throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
  }

  public RemoveComponent<C extends IComponent>(constr: constr<C>): void {
    let toRemove: IComponent | undefined
    let index: number | undefined

    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i]
      if (component instanceof constr) {
        toRemove = component
        index = i
        break
      }
    }

    if (toRemove && index) {
      toRemove.Entity = null
      this._components.splice(index, 1)
    }
  }

  public HasComponent<C extends IComponent>(constr: constr<C>): boolean {
    for (const component of this._components) {
      if (component instanceof constr) {
        return true
      }
    }

    return false
  }

  public Awake(): void {
    for(const component of this._components){
      component.Awake()
    }
  }

  public Update(deltaTime: number): void {
    for(const component of this._components){
      component.Update(deltaTime)
    }
  }
}
