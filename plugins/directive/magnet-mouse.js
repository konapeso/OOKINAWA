import Vue from 'vue'
import MagnetMouse from '@/object/utility/MagnetMouse'

const defaults = {
  perspective: 500,
  duration: 0.4,
  ease: 0.2,
  velocity: {
    x: 0.2,
    y: 0.2,
    z: 0,
    rx: 10,
    ry: 10
  }
}
const hasTouch = 'ontouchstart' in window

Vue.directive('magnet-mouse', (el, binding) => {
  const options = {
    ...defaults,
    ...binding.value
  }

  const mousefx = new MagnetMouse(el, options)
  !hasTouch && mousefx.init()
})
