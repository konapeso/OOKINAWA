import { toArray } from '@/helpers/dom'

const setStyle = (elements, props) => {
  toArray(elements).forEach((el) => {
    const style = el.style
    for (const [key, val] of Object.entries(props)) {
      style[key] = val
    }
  })
}

const getStyle = (element, prop) => {
  return getComputedStyle(element)[prop]
}

const getTransformMatrix = (element) => {
  const transformProp = getStyle(element, 'transform')
  const regMatrix = /^matrix\((.+)\)$/

  if (!element) {
    return null
  }

  if (transformProp && transformProp.match(regMatrix)) {
    const regArr = transformProp.match(regMatrix)

    if (regArr && regArr[1]) {
      const values = regArr[1].split(',')
      const x = parseFloat(values[4])
      const y = parseFloat(values[5])
      const scaleX = parseFloat(values[0])
      const scaleY = parseFloat(values[3])
      const skewX = parseFloat(values[2])
      const skewY = parseFloat(values[1])

      return { x, y, scaleX, scaleY, skewX, skewY }
    }
  }

  return { x: 0, y: 0, scaleX: 0, scaleY: 0, skewX: 0, skewY: 0 }
}

export { setStyle, getStyle, getTransformMatrix }
