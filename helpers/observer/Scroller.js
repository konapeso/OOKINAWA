import { on } from '@/helpers/event'
import { isFunction } from '@/helpers/is'

class Scroller {
  constructor () {
    this.listeners = []
    process.client && on(window, 'scroll', this.onScroll.bind(this))
  }

  onScroll () {
    const { pageYOffset, pageXOffset } = window
    this.listeners.forEach(fn => fn(pageYOffset, pageXOffset))
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

export default new Scroller()
