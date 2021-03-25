const isNull = (val) => {
  return val === null
}

const isBoolean = (val) => {
  return typeof val === 'boolean'
}

const isFunction = (val) => {
  return typeof val === 'function'
}

const isObject = (val) => {
  return val === Object(val)
}

const isArray = (val) => {
  return Array.isArray(val)
}

const isNumber = (val) => {
  return typeof val === 'number'
}

const isString = (val) => {
  return typeof val === 'string'
}

const isElement = (element) => {
  return element instanceof HTMLElement
}

const isNodeList = (val) => {
  return val instanceof NodeList
}

const isHTMLCollection = (val) => {
  return val instanceof HTMLCollection
}

export {
  isNull,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isNumber,
  isString,
  isElement,
  isNodeList,
  isHTMLCollection
}
