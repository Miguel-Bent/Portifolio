export class MinHeap<T> {
  private buf: { v: T; k: number; s: number }[] = []
  private s = 0

  push(v: T, k: number) {
    this.buf.push({ v, k, s: this.s++ })
    this.up(this.buf.length - 1)
  }

  pop(): T | undefined {
    if (!this.buf.length) return undefined
    const top = this.buf[0]
    const last = this.buf.pop()!
    if (this.buf.length) {
      this.buf[0] = last
      this.down(0)
    }
    return top.v
  }

  empty() {
    return !this.buf.length
  }

  private up(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1
      if (!this.lt(i, p)) break
      ;[this.buf[i], this.buf[p]] = [this.buf[p], this.buf[i]]
      i = p
    }
  }

  private down(i: number) {
    const n = this.buf.length
    while (true) {
      let m = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < n && this.lt(l, m)) m = l
      if (r < n && this.lt(r, m)) m = r
      if (m === i) break
      ;[this.buf[i], this.buf[m]] = [this.buf[m], this.buf[i]]
      i = m
    }
  }

  private lt(a: number, b: number) {
    const A = this.buf[a]
    const B = this.buf[b]
    return A.k !== B.k ? A.k < B.k : A.s < B.s
  }
}
