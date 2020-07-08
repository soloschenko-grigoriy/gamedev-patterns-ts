import { Entity } from '@/utils'

export class Game extends Entity {
  private _lastTimestamp = 0

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    // update all components
    super.Update(deltaTime)

    // update the timestamp
    this._lastTimestamp = Date.now()

    // Invoke on next frame
    window.requestAnimationFrame(() => this.Update())
  }
}
