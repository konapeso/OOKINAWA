import recorder from '@/helpers/observer/Recorder'
import resizer from '@/helpers/observer/Resizer'
import { on, off } from '@/helpers/event'
import { gsap } from 'gsap'

export default class MagnetMouse {
  constructor (el, options) {
    this.el = el
    this.options = options
  }

  init () {
    const { x, y } = this.getCenterCoord()

    this.center = { x, y }
    this.position = { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0 }
    this.target = {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      reset: () => {
        this.x = 0
        this.y = 0
        this.z = 0
        this.rotateX = 0
        this.rotateY = 0
      }
    }
    this.isTicking = false
    this.tweener = null

    ;['onResize', 'onRender', 'onMouseOver', 'onMouseMove', 'onMouseOut'].forEach((eventName) => {
      this[eventName] = this[eventName].bind(this)
    })
    this.bindEvents()
    resizer.add(this.onResize)
  }

  dispose () {
    resizer.remove(this.onResize)
    this.unbindEvents()
  }

  getCenterCoord () {
    return {
      x: this.el.offsetWidth * 0.5,
      y: this.el.offsetHeight * 0.5
    }
  }

  setTransform () {
    const { perspective } = this.options
    gsap.set(this.el, {
      transformPerspective: perspective,
      x: this.position.x,
      y: this.position.y,
      z: this.position.z,
      rotationX: this.position.rotateY,
      rotationY: this.position.rotateX
    })
  }

  bindEvents () {
    on(this.el, 'mouseover', this.onMouseOver)
    on(this.el, 'mouseout', this.onMouseOut)
  }

  unbindEvents () {
    off(this.el, 'mouseover', this.onMouseOver)
    off(this.el, 'mouseout', this.onMouseOut)
  }

  onResize () {
    this.center = this.getCenterCoord()
  }

  onRender () {
    const { velocity, ease } = this.options
    this.position.x += (this.target.x * velocity.x - this.position.x) * ease
    this.position.y += (this.target.y * velocity.y - this.position.y) * ease
    this.position.z += (this.target.z * velocity.z - this.position.z) * ease
    this.position.rotateX += (this.target.rotateX - this.position.rotateX) * ease
    this.position.rotateY += (this.target.rotateY - this.position.rotateY) * ease

    this.setTransform()
  }

  onMouseOver () {
    this.onResize()
    on(this.el, 'mousemove', this.onMouseMove)

    if (this.tweener) {
      this.tweener.kill()
    }

    if (!this.isTicking) {
      this.isTicking = true
      recorder.add(this.onRender)
    }
  }

  onMouseMove (e) {
    e.stopPropagation()
    const { velocity } = this.options
    this.target.x = e.offsetX - this.center.x
    this.target.y = e.offsetY - this.center.y
    this.target.rotateX = (this.target.x / this.center.x) * velocity.rx
    this.target.rotateY = -(this.target.y / this.center.y) * velocity.ry
  }

  onMouseOut () {
    off(this.el, 'mousemove', this.onMouseMove)
    recorder.remove(this.onRender)
    // this.target.reset()
    this.isTicking = !this.isTicking

    const { duration, easing } = this.options
    this.tweener = gsap.to(this.position, {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      ease: easing,
      duration,
      onUpdate: () => this.setTransform()
    })
  }
}
