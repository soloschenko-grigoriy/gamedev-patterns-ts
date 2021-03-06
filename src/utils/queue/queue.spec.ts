import {Queue} from './queue'

describe('>>> Queue', () => {
  let q: Queue<string>
  beforeEach(() => {
    q = new Queue<string>()
  })

  describe('>> Enqueue', () => {
    it('should add new item in the end of the queue', () => {
      q.Enqueue('one')
      q.Enqueue('two')
      q.Enqueue('three')

      expect(q.Items).toStrictEqual(['one', 'two', 'three'])
    })
  })

  describe('>> Dequeue', () => {
    it('should remove and return from the top of the queue', () => {
      q.Enqueue('one')
      q.Enqueue('two')
      q.Enqueue('three')

      expect(q.Dequeue()).toBe('one')
    })
  })

  describe('>> isEmpty', () => {
    it('should return true if queue is empty and false otherwise', () => {
      expect(q.Items.length).toBe(0)
      expect(q.IsEmpty).toBeTruthy()
      q.Enqueue('one')


      expect(q.Items.length).not.toBe(0)
      expect(q.IsEmpty).toBeFalsy()
    })
  })
})
