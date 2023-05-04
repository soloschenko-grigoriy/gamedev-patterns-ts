export interface IPriorityQueue<T> {
  IsEmpty: boolean

  Enqueue(item: T, priority: number): void
  Dequeue(): T
}

export interface IPriorityQueueItem<T> {
  priority: number
  value: T
}
