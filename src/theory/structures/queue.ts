export class Queue<T> {
  private q: T[] = []
  private i = 0

  enqueue(v: T) {
    this.q.push(v)
  }

  dequeue(): T | undefined {
    if (this.i >= this.q.length) return undefined
    return this.q[this.i++]
  }

  empty() {
    return this.i >= this.q.length
  }
}
