import * as THREE from 'three'
import vertexShader from '@/glsl/target.vert'
import fragmentShader from '@/glsl/target.frag'
import { map } from '@/helpers/math'
import circleImg from '@/assets/img/circle.png'

export default class TargetScene extends THREE.Scene {
  constructor () {
    super()
    this.renderTarget = new THREE.WebGLRenderTarget(1, 1)
    this.geometry = new THREE.DodecahedronBufferGeometry(1, 3)

    const loader = new THREE.TextureLoader()
    const texture = loader.load(circleImg)

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
        morph: {
          type: 'f',
          value: 0.0
        },
        psize: {
          type: 'f',
          value: 3.0
        },
        map: {
          type: 't',
          value: texture
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        }
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.geometry.verticesNeedUpdate = true
    this.mesh.geometry.morphTargetsNeedUpdate = true
    this.add(this.mesh)
    this.count = 0
  }

  update (width, height, { time, tmorph, psize }) {
    this.count += time / 800
    this.material.uniforms.time.value += time / 500
    this.material.uniforms.morph.value = tmorph
    this.material.uniforms.psize.value = psize

    this.renderTarget.setSize(width, height)

    const scaleX = map(Math.sin(this.count), 0, 1, 1, 1.3)
    const scaleY = map(Math.sin(this.count), 0, 1, 0.75, 0.8)
    this.mesh.scale.set(scaleX, scaleY, 1)
    this.mesh.rotation.z = Math.sin(this.count)
  }

  set renderTarget (val) {
    this._renderTarget = val
  }

  get renderTarget () {
    return this._renderTarget
  }
}
