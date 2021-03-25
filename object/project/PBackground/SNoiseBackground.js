import * as THREE from 'three'
import { gsap } from 'gsap'
import Stats from 'stats-js'
import FramesPerSecond from '@/helpers/animation/FramesPerSecond.js'
import resizer from '@/helpers/observer/Resizer.js'
import recorder from '@/helpers/observer/Recorder.js'
import emitter from '@/helpers/observer/EventEmitter'
import getParameter from '@/helpers/getParameter'
import { EVENTS as SLIDE_EVENTS } from '@/object/project/PTopCharacter'
import { EVENTS as MODAL_EVENTS } from '@/object/project/ModalGroup/index'
import { trigger } from '@/helpers/event'
import { clamp, degreesToRads } from '@/helpers/math'
import WebGL from './WebGL'
import NoiseObject from './NoiseObject'
import TargetScene from './TargetScene'

export default class SNoiseBackground {
  constructor (element) {
    if (!element) {
      throw new Error('Argument must be a element.')
    }
    this.element = element

    this.cameraZ = 12
    this.cameraRange = {
      min: 14.5,
      max: 7
    }
    this.fixedSelector = '.p-top-character__slide-item.is-character-active .p-top-character__slide-img'
    const { offsetWidth, offsetHeight } = element
    this.webgl = new WebGL(element, { alpha: true })
    this.webgl.camera = new THREE.PerspectiveCamera(
      20,
      offsetWidth / offsetHeight,
      1,
      10000
    )
    this.webgl.camera.position.set(0, 0, this.cameraZ)
    // this.controls = new OrbitControls(this.webgl.camera, this.webgl.domElement)
    this.fps = new FramesPerSecond(30)
    this.options = {
      time: 4,
      morph: 0.1,
      tmorph: 0.3,
      RGBr: 4.5,
      RGBg: 1,
      RGBb: 3,
      RGBn: 3,
      RGBm: 1,
      blurX: 0.2,
      blurY: 0.1,
      psize: 1
    }
    this.location = {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      tx: 0,
      ty: 0
    }
    this.ease = 0.05
    this.isFixed = false
    this.isVisibleCharacter = false
    this.isAppear = false
    this.isModalVisible = false
    this.targetScene = new TargetScene()
    this.noiseObj = new NoiseObject(this.targetScene.renderTarget.texture)
    this.webgl.add(this.noiseObj, this.webgl.camera)

    if (process.browser) {
      const param = getParameter(location.search)
      this.isDebug = param.has('debug')
    }

    ;['onTick', 'onResize', 'onEnterCharacter', 'onLeaveCharacter', 'onTransitionStartCharacter', 'onTransitionEndCharacter', 'onModalOpen', 'onModalClose'].forEach((eventName) => {
      this[eventName] = this[eventName].bind(this)
    })

    this.setup()
    this.bindEvents()

    process.client && trigger(window, 'resize')
  }

  setup () {
    if (process.client && this.isDebug) {
      this.initStats()
      this.initDatGUI()
    }
  }

  initStats () {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  initDatGUI () {
    // importだとNuxtでエラーになるためdynamic import
    let domGUI = document.querySelector('.ac')
    if (!domGUI) {
      const dat = require('dat.gui')
      const gui = new dat.GUI()
      const setupGUI = gui.addFolder('Setup')
      setupGUI
        .add(this.options, 'time', 0.0, 10.0)
        .name('Speed')
        .listen()
      setupGUI
        .add(this.options, 'morph', 0.0, 2.0)
        .name('Morph')
        .listen()
      setupGUI
        .add(this.options, 'tmorph', 0.0, 2.0)
        .name('TargetMorph')
        .listen()
      setupGUI
        .add(this.options, 'blurX', 0.0, 15.0)
        .name('BlurX')
        .listen()
      setupGUI
        .add(this.options, 'blurY', 0.0, 15.0)
        .name('BlurY')
        .listen()
      setupGUI.open()

      const rgbGUI = gui.addFolder('RGB')
      rgbGUI
        .add(this.options, 'RGBr', 0.0, 10.0)
        .name('Red')
        .listen()
      rgbGUI
        .add(this.options, 'RGBg', 0.0, 10.0)
        .name('Green')
        .listen()
      rgbGUI
        .add(this.options, 'RGBb', 0.0, 10.0)
        .name('Blue')
        .listen()
      rgbGUI
        .add(this.options, 'RGBn', 0.0, 3.0)
        .name('Black')
        .listen()
      rgbGUI
        .add(this.options, 'RGBm', 0.0, 1.0)
        .name('Chroma')
        .listen()
      rgbGUI.open()

      setTimeout(() => {
        domGUI = document.querySelector('.ac')
        domGUI.style.zIndex = 5
      }, 1000)
    }
  }

  bindEvents () {
    resizer.add(this.onResize)
    recorder.add(this.onTick)
    emitter.on(SLIDE_EVENTS.ENTER, this.onEnterCharacter)
    emitter.on(SLIDE_EVENTS.LEAVE, this.onLeaveCharacter)
    emitter.on(SLIDE_EVENTS.TRNASITION_START, this.onTransitionStartCharacter)
    emitter.on(SLIDE_EVENTS.TRNASITION_END, this.onTransitionEndCharacter)
    emitter.on(MODAL_EVENTS.OPEN, this.onModalOpen)
    emitter.on(MODAL_EVENTS.CLOSE, this.onModalClose)
  }

  unbindEvents () {
    resizer.remove(this.onResize)
    recorder.remove(this.onTick)
    emitter.off(SLIDE_EVENTS.ENTER, this.onEnterCharacter)
    emitter.off(SLIDE_EVENTS.LEAVE, this.onLeaveCharacter)
    emitter.off(SLIDE_EVENTS.TRNASITION_START, this.onTransitionStartCharacter)
    emitter.off(SLIDE_EVENTS.TRNASITION_END, this.onTransitionEndCharacter)
    emitter.off(MODAL_EVENTS.OPEN, this.onModalOpen)
    emitter.off(MODAL_EVENTS.CLOSE, this.onModalClose)
  }

  render () {
    this.isDebug && this.stats.update()
    this.targetScene.update(
      this.webgl.width * this.webgl.dpr,
      this.webgl.height * this.webgl.dpr,
      this.options
    )
    this.webgl.renderer.setRenderTarget(this.targetScene.renderTarget)
    this.webgl.renderer.render(this.targetScene, this.webgl.camera)
    this.webgl.renderer.setRenderTarget(null)

    this.noiseObj.update(this.options)
    this.webgl.update()

    this.isFixed && this.updateMesh()
  }

  onTick () {
    if (!this.fps.check()) {
      return
    }
    this.render()
  }

  onResize () {
    this.webgl.resize()
    const aspect = this.webgl.camera.aspect
    const z = clamp(this.cameraZ / aspect, this.cameraRange.max, this.cameraRange.min)
    this.webgl.camera.position.z = z
    this.noiseObj.resize(
      this.webgl.width * this.webgl.dpr,
      this.webgl.height * this.webgl.dpr
    )
  }

  getViewSize () {
    const fovInRadians = degreesToRads(this.webgl.camera.fov)
    const height = Math.abs(this.webgl.camera.position.z * Math.tan(fovInRadians / 2) * 2)
    return { width: height * this.webgl.camera.aspect, height }
  }

  updateMesh () {
    const rect = this.activeSlide.getBoundingClientRect()
    const viewSize = this.getViewSize()
    const { offsetWidth, offsetHeight } = this.element

    const widthViewUnit = (rect.width * viewSize.width) / offsetWidth
    const heightViewUnit = (rect.height * viewSize.height) / offsetHeight
    let xViewUnit = (rect.left * viewSize.width) / offsetWidth
    let yViewUnit = (rect.top * viewSize.height) / offsetHeight

    xViewUnit = xViewUnit - viewSize.width / 2
    yViewUnit = yViewUnit - viewSize.height / 2

    const x = xViewUnit + widthViewUnit / 2
    const y = -yViewUnit - heightViewUnit / 2

    this.location.tx = x
    this.location.ty = y
    this.location.x += (this.location.tx - this.location.x) * this.ease
    this.location.y += (this.location.ty - this.location.y) * this.ease
    const size = Math.max(widthViewUnit / 2, heightViewUnit / 2)
    this.location.w += (size - this.location.w) * this.ease
    this.location.h += (size - this.location.h) * this.ease

    this.noiseObj.scale.x = this.location.w
    this.noiseObj.scale.y = this.location.h
    this.noiseObj.position.x = this.location.x
    this.noiseObj.position.y = this.location.y

    this.targetScene.scale.x = this.location.w
    this.targetScene.scale.y = this.location.h
    this.targetScene.position.x = this.location.x
    this.targetScene.position.y = this.location.y
  }

  resetMesh () {
    gsap.to(this.location, {
      duration: 1.5,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      ease: 'power1.out',
      onUpdate: () => {
        this.noiseObj.scale.x = this.location.w
        this.noiseObj.scale.y = this.location.h
        this.noiseObj.position.x = this.location.x
        this.noiseObj.position.y = this.location.y

        this.targetScene.scale.x = 1
        this.targetScene.scale.y = 1
        this.targetScene.position.x = this.location.x
        this.targetScene.position.y = this.location.y
      }
    })
  }

  onEnterCharacter () {
    this.isVisibleCharacter = true
    this.activeSlide = document.querySelector(this.fixedSelector)
    if (!this.isModalVisible) {
      this.isFixed = true
    }
  }

  onLeaveCharacter () {
    this.isVisibleCharacter = false
    this.isFixed = false
    if (this.isAppear && !this.isModalVisible) {
      this.resetMesh()
    }
  }

  onTransitionEndCharacter () {
    if (!this.isVisibleCharacter) {
      return
    }
    this.onEnterCharacter()
  }

  onTransitionStartCharacter () {
    if (!this.isVisibleCharacter) {
      return
    }
    this.isFixed = false
  }

  onModalOpen () {
    this.isFixed = false
    this.isModalVisible = true
    this.resetMesh()
  }

  onModalClose () {
    this.isModalVisible = false
    this.isFixed = !!this.isVisibleCharacter
  }

  async animateIn () {
    await gsap.from(this.targetScene.scale, {
      x: 10,
      y: 10,
      duration: 3.2,
      ease: 'power2.out'
    })
    this.isAppear = true
  }
}
