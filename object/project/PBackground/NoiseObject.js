import * as THREE from 'three'
import vertexShader from '@/glsl/blob.vert'
import fragmentShader from '@/glsl/snoise.frag'

export default class NoiseObject extends THREE.Object3D {
  constructor (texture) {
    super()
    this.geometry = new THREE.DodecahedronBufferGeometry(1, 5)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
        RGBr: {
          type: 'f',
          value: 0.0
        },
        RGBg: {
          type: 'f',
          value: 0.0
        },
        RGBb: {
          type: 'f',
          value: 0.0
        },
        RGBn: {
          type: 'f',
          value: 0.0
        },
        RGBm: {
          type: 'f',
          value: 0.0
        },
        morph: {
          type: 'f',
          value: 0.0
        },
        blurX: {
          type: 'f',
          value: 0.0
        },
        blurY: {
          type: 'f',
          value: 0.0
        },
        psize: {
          type: 'f',
          value: 3.0
        },
        diffuse: {
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
    this.mesh.reseivedShadow = true
    this.mesh.castShadow = true
    this.add(this.mesh)
  }

  update ({ time, morph, blurX, blurY, RGBr, RGBg, RGBb, RGBn, RGBm, psize }) {
    this.material.uniforms.time.value += time / 500
    this.material.uniforms.morph.value = morph
    this.material.uniforms.blurX.value = blurX
    this.material.uniforms.blurY.value = blurY
    this.material.uniforms.RGBr.value = RGBr / 10
    this.material.uniforms.RGBg.value = RGBg / 10
    this.material.uniforms.RGBb.value = RGBb / 10
    this.material.uniforms.RGBn.value = RGBn / 10
    this.material.uniforms.RGBm.value = RGBm
    this.material.uniforms.psize.value = psize
    this.mesh.rotation.z += 0.002
  }

  resize (width, height) {
    this.material.uniforms.resolution.value.set(width, height)
  }

  set mesh (val) {
    this._mesh = val
  }

  get mesh () {
    return this._mesh
  }
}
