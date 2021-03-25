import * as THREE from 'three'

export default class WebGL {
  constructor (element, { antialias = true, alpha = false } = {}) {
    this.element = element
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias, alpha })
    this.camera = null
    this.width = this.element.offsetWidth
    this.height = this.element.offsetHeight
    this.dpr = process.client ? Math.min(window.devicePixelRatio || 1, 2) : 1
    this.renderer.setPixelRatio(this.dpr)
    this.mount(this.renderer.domElement)
  }

  mount (dom) {
    this.element.appendChild(dom)
  }

  resize () {
    this.width = this.element.offsetWidth
    this.height = this.element.offsetHeight
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height)
  }

  add (mesh) {
    this.scene.add(mesh)
  }

  remove (mesh) {
    this.scene.remove(mesh)
  }

  update () {
    this.renderer.render(this.scene, this.camera)
  }

  set renderer (renderer) {
    this._renderer = renderer
  }

  get renderer () {
    return this._renderer
  }

  set scene (scene) {
    this._scene = scene
  }

  get scene () {
    return this._scene
  }

  set camera (camera) {
    this._camera = camera
  }

  get camera () {
    return this._camera
  }

  set width (val) {
    this._width = val
  }

  get width () {
    return this._width
  }

  set height (val) {
    this._height = val
  }

  get height () {
    return this._height
  }

  set dpr (val) {
    this._dpr = val
  }

  get dpr () {
    return this._dpr
  }

  get domElement () {
    return this.renderer.domElement
  }
}
