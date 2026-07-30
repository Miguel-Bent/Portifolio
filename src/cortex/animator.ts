class Animator {
  wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const t0 = performance.now()
      const tick = (t: number) => {
        if (t - t0 >= ms) {
          resolve()
          return
        }
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  }
}

export const animator = new Animator()
