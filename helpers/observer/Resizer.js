import { on } from '@/helpers/event'
import { isFunction } from '@/helpers/is'

class Resizer {
  constructor () {
    this.listeners = []
    process.client && on(window, 'resize', this.onResize.bind(this))
  }

  onResize () {
    const { innerWidth, innerHeight } = window
    this.listeners.forEach(fn => fn(innerWidth, innerHeight))
  }

  add (fn) {
    if (!isFunction(fn)) {
      throw new TypeError(`${fn} isn't Function`)
    }
    this.listeners.push(fn)
  }

  remove (fn) {
    this.listeners.forEach((listener, i) => {
      if (fn === listener) {
        this.listeners.splice(i, 1)
      }
    })
  }
}

export default new Resizer()
