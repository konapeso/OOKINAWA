import { isElement } from '@/helpers/is'
import { toArray } from '@/helpers/dom'
import preloadImages from '@/helpers/preloadImages'
import getBackgroundImages from '@/helpers/getBackgroundImages'

const getImages = (nodes) => {
  return toArray(nodes)
    .map((el) => {
      if (el.tagName.toLowerCase() === 'img') {
        return el.src
      }
    })
    .filter(Boolean)
}

export default class ImagesLoaded {
  static load (element = document.body) {
    if (!isElement(element)) return
    const nodes = element.querySelectorAll('*')
    return preloadImages([...getImages(nodes), ...getBackgroundImages(nodes)])
  }
}
