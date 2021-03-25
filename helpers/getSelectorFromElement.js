/**
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L78
 * @param  {HTMLElement} element
 * @return {?HTMLElement}
 */
const getSelectorFromElement = (element) => {
  let selector = element.dataset.href

  if (!selector || selector === '#') {
    selector = element.getAttribute('href') || ''
  }

  if (!selector) {
    return null
  }

  try {
    let target = document.querySelector(selector)

    if (!target) {
      target = document.querySelector(
        `[data-id=${
          selector.match(/(^#|[^&]#)/gi) ? selector.replace(/^#/, '') : selector
        }]`
      )
    }
    return target || null
  } catch (err) {
    return null
  }
}

export default getSelectorFromElement
