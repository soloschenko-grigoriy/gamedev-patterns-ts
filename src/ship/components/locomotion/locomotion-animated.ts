import { Vector2D } from '@/utils'
 import { Node } from '@/node'
 import { Ship } from '@/ship'
 import { ShipLocomotionComponent } from './locomotion'
 import { Settings } from '@/settings'

 export class ShipLocomotionAnimatedComponent extends ShipLocomotionComponent {
   public Entity: Ship
   private _currentPosition: Vector2D
   private _startPosition: Vector2D
   private _timeStarted: number
   private _isInProgress = false

   public get Position(): Vector2D {
     return this._currentPosition
   }

   constructor(node: Node) {
     super(node)
     this._currentPosition = this._node.Center
   }

   public Update(deltaTime: number): void {
     if (!this._node) {
       return
     }

     if (!this._node.Next || !this.Entity.IsActive) {
       this._isInProgress = false
       return
     }

     if (this._isInProgress) {
       return this.Locomote(this._node, this._node.Next)
     }


     this._isInProgress = true
     this._startPosition = this._node.Center
     this._timeStarted = Date.now()
   }

   private Locomote(node: Node, next: Node): void {
     const targetPosition = next.Center
     const progress = (Date.now() - this._timeStarted) / Settings.ships.locomotion.duration
     node.Ship = null
     next.Ship = this.Entity

     this._previousPosition = this._currentPosition
     if (progress >= 1) {
       this._isInProgress = false
       this._previousPosition = this._currentPosition
       this._currentPosition = targetPosition
       this._node = next
     } else {
       this._currentPosition = Vector2D.Lerp(this._startPosition, targetPosition, progress)
     }
   }
 }
