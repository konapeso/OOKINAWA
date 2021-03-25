import Recorder from '@/helpers/observer/Recorder'
import delay from '@/helpers/delay'
import { getOffset } from '@/helpers/dom'
import { isString } from '@/helpers/is'
import { clamp } from '@/helpers/math'
import ease from './easing'

const start = { x: 0, y: 0 }
const stop = { x: 0, y: 0 }
const distance = { x: 0, y: 0 }
let vars = {}
let progress = 0
let isAnimating = false
let startTime = 0
let elapsedTime = 0

const reset = () => {
  vars = {}
  progress = 0
  isAnimating = false
  startTime = 0
  elapsedTime = 0
}

const complete = (current) => {
  Recorder.remove(animate)
  reset()
  window.scrollTo(current.x, current.y)
}

const animate = () => {
  elapsedTime = Date.now() - startTime
  progress = elapsedTime / vars.duration
  progress = clamp(progress, 0, 1)
  progress = vars.easing(progress, 0, 1, 1)

  const current = {
    x: start.x + distance.x * progress,
    y: start.y + distance.y * progress
  }

  vars.direction === 'horizontal' ? (current.y = 0) : (current.x = 0)
  progress < 1 ? window.scrollTo(current.x, current.y) : complete(current)
}

const scrollTo = async (
  element,
  {
    direction = 'vertical',
    offset = 0,
    wait = 0,
    duration = 500,
    easing = 'easeInOutExpo'
  } = {}
) => {
  if (isAnimating) {
    return
  }

  element = isString(element) ? document.querySelector(element) : element

  vars = {
    direction,
    duration,
    easing: ease[easing]
  }

  await delay(wait)

  const { top, left } = getOffset(element)
  stop.x = left + offset
  stop.y = top + offset

  const { pageXOffset, pageYOffset } = window
  start.x = pageXOffset
  start.y = pageYOffset

  distance.x = stop.x - start.x
  distance.y = stop.y - start.y

  isAnimating = !isAnimating
  startTime = Date.now()
  Recorder.add(animate)
}

export default scrollTo
