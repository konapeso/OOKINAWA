class EventEmitter {
  constructor () {
    this.eventLookup = {}
  }

  once (eventName, callback, scope = this, priority = 0) {
    return this.on(eventName, callback, scope, priority, true)
  }

  on (eventName, callback, scope = this, priority = 0, once = false) {
    let listeners = this.eventLookup[eventName]

    if (!listeners) {
      this.eventLookup[eventName] = listeners = []
    }

    let index = 0

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i].priority > priority) {
        index = i + 1
      }
    }

    listeners.splice(index, 0, {
      callback,
      scope,
      priority,
      once
    })

    return () => this.off(eventName, callback, scope)
  }

  off (eventName, callback, scope = this) {
    const listeners = this.eventLookup[eventName]

    if (eventName === '*') {
      this.eventLookup = {}
    } else if (!callback) {
      this.eventLookup[eventName] = []
    } else {
      for (let i = 0; i < listeners.length; i++) {
        if (
          listeners[i].callback === callback &&
          listeners[i].scope === scope
        ) {
          listeners.splice(i, 1)
          return
        }
      }
    }
  }

  emit (eventName, ...data) {
    const listeners = this.eventLookup[eventName]

    if (!listeners) {
      return
    }

    for (let i = 0; i < listeners.length; i++) {
      const { callback, scope, once } = listeners[i]

      if (once) {
        this.off(eventName, callback, scope)
      }

      callback.apply(scope, data)
    }
  }
}

export default new EventEmitter()
