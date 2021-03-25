import { toArray } from '@/helpers/dom'
import { getStyle } from '@/helpers/style'
import { flatten } from '@/helpers/array'

/**
 * @param  {HTMLElement|NodeList} elements
 * @return {Array}
 */
const getBackgroundImages = (elements) => {
  return flatten(
    toArray(elements)
      .map((element) => {
        const value = getStyle(element, 'backgroundImage')
        if (value !== 'none' && value.includes('url')) {
          // multiple background image
          /* eslint no-useless-escape: 0 */
          return value
            .match(/\burl\((?!['"]?:)['"]?([^'"\)]*)['"]?\)/gi)
            .map(
              url =>
                url.match(/^url\("?(.+?)"?\)$/) !== null &&
                url.match(/^url\("?(.+?)"?\)$/)[1]
            )
        }
        return false
      })
      .filter(Boolean)
  )
}

export default getBackgroundImages
