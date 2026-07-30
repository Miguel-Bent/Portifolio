export class Stack<T> {
  private s: T[] = []

  push(v: T) {
    this.s.push(v)
  }

  pop(): T | undefined {
    return this.s.pop()
  }

  peek(): T | undefined {
    return this.s[this.s.length - 1]
  }

  toArray(): T[] {
    return [...this.s]
  }

  size() {
    return this.s.length
  }
}
