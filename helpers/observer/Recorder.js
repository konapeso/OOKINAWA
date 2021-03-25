import { isFunction } from '@/helpers/is'

class Recorder {
  constructor () {
    this.rafId = null
    this.listeners = []
    this.isAnimating = false
  }

  loop () {
    this.rafId = requestAnimationFrame((timestamp) => {
      this.listeners.forEach(fn => fn(timestamp))
      if (this.isAnimating) this.loop()
    })
  }

  add (fn) {
    if (!isFunction(fn)) {
      throw new TypeError(`${fn} isn't Function`)
    }

    this.listeners.push(fn)

    if (this.listeners.length > 0 && !this.isAnimating) {
      this.start()
    }
  }

  remove (fn) {
    this.listeners.forEach((listener, i) => {
      if (fn === listener) {
        this.listeners.splice(i, 1)
      }
    })

    if (this.listeners.length <= 0) {
      this.stop()
    }
  }

  start () {
    this.isAnimating = true
    this.loop()
  }

  stop () {
    this.isAnimating = false
    this.rafId && cancelAnimationFrame(this.rafId)
  }
}

export default new Recorder()
