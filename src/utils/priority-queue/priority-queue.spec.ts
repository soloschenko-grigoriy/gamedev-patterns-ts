import { IPriorityQueue } from './priority-queue.h'
import { PriorityQueue } from './priority-queue'

describe('>>> Priority Queue', () => {
  let q: IPriorityQueue<string>
  beforeEach(() => {
    q = new PriorityQueue<string>()
  })

  it('should return IsEmpty true if queue is empty and false otherwise', () => {
    expect(q.IsEmpty).toBeTruthy()

    q.Enqueue('one', 1)
    expect(q.IsEmpty).toBeFalsy()

    q.Dequeue()
    expect(q.IsEmpty).toBeTruthy()
  })

  it('should Enqueue and Dequeue items in the queue according to priority', () => {
    q.Enqueue('two', 1)
    q.Enqueue('one', 0)
    q.Enqueue('three', 2)

    expect(q.Dequeue()).toEqual<string>('one')
    expect(q.Dequeue()).toEqual<string>('two')
    expect(q.Dequeue()).toEqual<string>('three')
  })
})
