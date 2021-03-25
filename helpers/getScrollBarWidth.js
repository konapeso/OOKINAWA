import { remove } from '@/helpers/dom'
import { setStyle } from '@/helpers/style'

const getScrollBarWidth = () => {
  const outer = document.createElement('div')
  const inner = document.createElement('div')

  setStyle(outer, { visibility: 'hidden', width: '100px' })
  document.body.appendChild(outer)

  const outerWidth = outer.offsetWidth
  setStyle(outer, { overflow: 'scroll' })
  setStyle(inner, { width: '100%' })
  outer.appendChild(inner)

  const innerWidth = inner.offsetWidth
  remove(outer)

  return outerWidth - innerWidth
}

export default getScrollBarWidth
