import { Vector2D } from '@/utils'
 import { Node } from '@/node'
 import { Ship } from '@/ship'
 import { ShipLocomotionComponent } from './locomotion'
 import { Settings } from '@/settings'

 export class ShipLocomotionAnimatedComponent extends ShipLocomotionComponent {
   public Entity: Ship
   private _currentPosition: Vector2D
   private _startPosition: Vector2D
   private timeElapsed: number
   private _isInProgress = false

   public get Position(): Vector2D {
     return this._currentPosition
   }

   constructor(node: Node) {
     super(node)
     this._currentPosition = this._node.Center
   }

   public Update(deltaTime: number): void {
     if(!this.Entity.IsActive){
       return
     }

     if (this._isInProgress) {
       this.Locomote(deltaTime)
       return
     }

     this._isInProgress = true
     this._startPosition = this._node.Center
     this.timeElapsed = 0
   }

   private Locomote(deltaTime: number): void {
     const node = this._node
     const next = this._path[0]

     // Nowhere to locomote anymore
     if(!next){
       this._isInProgress = false
       this.Entity.OnMoveCompleted(this._node)

       return
     }

     const duration = Settings.ships.locomotion.duration / 1000
     const targetPosition = next.Center

     // smth is off with ships sets
     node.Ship = null
     next.Ship = this.Entity

     this._previousPosition = this._currentPosition
     if(this.timeElapsed < duration){
       this._currentPosition = Vector2D.Lerp(this._startPosition, targetPosition, this.timeElapsed / duration)
       this.timeElapsed += deltaTime
       return
     }

     this._isInProgress = false
     this._previousPosition = this._currentPosition
     this._currentPosition = targetPosition
     this._node = next
     this._path.shift()
   }
 }
