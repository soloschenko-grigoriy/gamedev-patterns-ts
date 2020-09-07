import { Entity } from '@/utils'
import { Fleet } from '@/fleet'

export class Ship extends Entity {
  constructor(public readonly Factory: Fleet) {
    super()
  }
}
