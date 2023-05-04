import { Vector2D } from '@/utils'
import { Node } from '@/node'
import { ShipLocomotionComponent } from './locomotion'
import { Settings } from '@/settings'

export class ShipLocomotionAnimatedComponent extends ShipLocomotionComponent {
  private _currentPosition: Vector2D
  private _next: Node
  private _timeElapsed: number
  private _startPosition: Vector2D
  private _endPosition: Vector2D
  private _isInProgress = false
  private _isAnimInProgress = false

  public get Position(): Vector2D {
    return this._currentPosition
  }

  constructor(node: Node) {
    super(node)
    this._currentPosition = node.Center
  }

  public Update(deltaTime: number): void {
    if(!this.Entity.IsActive){
      return
    }

    this._next = this._path[0]

    if(this._next){
      if(!this._isInProgress){
        this.StartLocomotion()
        return
      }

      if(!this._isAnimInProgress){
        this.StartAnim()
        return
      }

      return this.Animate(deltaTime)
    }

    if(this._isInProgress){
      this.CompleteLocomotion()
    }
  }

  private StartLocomotion(): void {
    this._isInProgress = true
  }

  private StartAnim(): void {
    this._isAnimInProgress = true
    this._startPosition = this._node.Center
    this._endPosition = this._next.Center

    this.Node.Ship = null
    this.Node = this._next
    
    this._timeElapsed = 0
  }

  private Animate(deltaTime: number): void {
    const duration = Settings.ships.locomotion.duration / 1000

    if(this._timeElapsed < duration){
      this._currentPosition = Vector2D.Lerp(this._startPosition, this._endPosition, this._timeElapsed / duration)
      this._timeElapsed += deltaTime
      return
    }

    this.CompleteAnim()
  }

  private CompleteAnim(): void {
    this._currentPosition = this._endPosition
    this._isAnimInProgress = false

    this._path.shift()
  }

  private CompleteLocomotion() : void {
    this._isInProgress = false
    this.Entity.OnMoveCompleted(this._node)
  }
}
