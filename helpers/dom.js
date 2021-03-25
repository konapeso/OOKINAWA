import { isArray, isNodeList, isHTMLCollection } from '@/helpers/is'

const toArray = (val) => {
  if (isNodeList(val) || isHTMLCollection(val)) {
    return Array.from(val)
  }
  return isArray(val) ? val : [val]
}

const getIndex = (element, elements) => {
  return toArray(elements).indexOf(element)
}

const getOffset = (element) => {
  let left = 0
  let top = 0

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    const { tagName, offsetLeft, offsetTop, scrollLeft, scrollTop } = element
    left += offsetLeft - (tagName !== 'BODY' ? scrollLeft : 0)
    top += offsetTop - (tagName !== 'BODY' ? scrollTop : 0)
    element = element.offsetParent
  }

  return { top, left }
}

/**
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L81
 */
const getSelectorFromElement = (element) => {
  let selector = element.getAttribute('data-href')

  if (!selector || selector === '#') {
    const hrefAttr = element.getAttribute('href')
    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : ''
  }

  try {
    return document.querySelector(selector) ? selector : null
  } catch (err) {
    return null
  }
}

const captureNode = (element, target) => {
  while (element.childNodes.length > 0) {
    target.appendChild(element.childNodes[0])
  }
}

const releaseNode = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

const remove = (element) => {
  element.parentNode !== null && element.parentNode.removeChild(element)
}

export {
  toArray,
  getIndex,
  getOffset,
  getSelectorFromElement,
  captureNode,
  releaseNode,
  remove
}
