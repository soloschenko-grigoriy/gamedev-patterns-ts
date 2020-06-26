import { Entity } from './entity'
import { IUpdate, IAwake } from '@/utils'

export interface IComponent extends IAwake, IUpdate {
  Entity: Entity | null
}
