import { IPriorityQueue, IPriorityQueueItem } from './priority-queue.h'

export class PriorityQueue<T> implements IPriorityQueue<T> {
  private _items: IPriorityQueueItem<T>[] = []

  public get IsEmpty(): boolean {
    return this._items.length === 0
  }

  public Enqueue(value: T, priority: number): void {
    this._items.push({
      value,
      priority
    })

    this._items = this._items.sort((a, b) => a.priority - b.priority)
  }
  public Dequeue(): T {
    const item = this._items.shift()
    if (typeof item === 'undefined') {
      throw new Error('Attempt to dequeue from an empty queue')
    }

    return item.value
  }
}
