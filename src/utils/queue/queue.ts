export class Queue<T> {
  private items: T[] = []

  public get Items (): T[] {
    return this.items
  }

  public get IsEmpty (): boolean {
    return this.items.length === 0
  }

  public Enqueue(elm: T): void {
    this.items.push(elm)
  }

  public Dequeue(): T {
    const item = this.items.shift()
    if(typeof item === 'undefined'){
      throw new Error('Attempt to dequeue from an empty queue')
    }

    return item
  }
}
