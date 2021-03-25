const on = (element, eventType, fn, options = false, selector = null) => {
  const handler = (e) => {
    let el = e.target

    while (el && el !== element) {
      if (selector && el.matches && el.matches(selector)) {
        fn(e, el)
        break
      }
      el = el.parentNode
    }
  }

  element.addEventListener(eventType, selector ? handler : fn, options)

  if (selector) return handler
}

const off = (element, eventType, fn, options = false) => {
  element.removeEventListener(eventType, fn, options)
}

const trigger = (element, eventType) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(eventType, false, true)
  element.dispatchEvent(e)
}

export { on, off, trigger }
