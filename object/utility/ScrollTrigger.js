import { isArray } from '@/helpers/is'

const CLASSNAMES = {
  INTERSECT: 'is-intersect'
}

export default class ScrollTrigger {
  constructor ({
    delay = 100,
    once = true,
    threshold = 1,
    rootMargin = '0px',
    root = null,
    refs = null
  } = {}) {
    this.options = { delay, once, threshold }
    this.queue = []
    this.isReady = true
    this.timerId = null
    this.refs = refs
    this.vars = {
      currentRatio: 0,
      prevRatio: 0,
      current: 0,
      prev: 0
    }

    this.observer = new IntersectionObserver(this.observe.bind(this), {
      threshold,
      rootMargin,
      root
    })
  }

  init () {
    if (this.refs.has('item')) {
      isArray(this.refs.get('item'))
        ? this.refs.get('item').forEach(item => this.observer.observe(item))
        : this.observer.observe(this.refs.get('item'))
    }
  }

  observe (entries) {
    const { threshold } = this.options
    entries.forEach((entry) => {
      const el = entry.target

      if (entry.intersectionRatio >= threshold) {
        this.queue.push(el)
        this.next()
      } else {
        // el.classList.remove(CLASSNAMES.INTERSECT)
      }
    })
  }

  next () {
    if (this.queue.length >= 1 && this.isReady) {
      this.isReady = false
      const { once } = this.options
      const item = this.queue.shift()
      const delay = item.getAttribute('data-delay') || this.options.delay

      this.timerId = setTimeout(() => {
        item.classList.add(CLASSNAMES.INTERSECT)
        this.isReady = true
        this.next()

        if (once) {
          this.observer.unobserve(item)
        }
      }, delay)
    }
  }

  reset () {
    if (this.refs.has('item')) {
      isArray(this.refs.get('item'))
        ? this.refs
          .get('item')
          .forEach(item => item.classList.remove(CLASSNAMES.INTERSECT))
        : this.refs.get('item').remove(CLASSNAMES.INTERSECT)
    }
  }

  dispose () {
    if (this.refs.has('item')) {
      isArray(this.refs.get('item'))
        ? this.refs.get('item').forEach(item => this.observer.unobserve(item))
        : this.observer.unobserve(this.refs.get('item'))
    }
  }

  set isReady (val) {
    this._isReady = val
  }

  get isReady () {
    return this._isReady
  }

  set target (val) {
    this._target = val
  }

  get target () {
    return this._target
  }

  set refs (val) {
    this._refs = val
  }

  get refs () {
    return this._refs
  }
}
