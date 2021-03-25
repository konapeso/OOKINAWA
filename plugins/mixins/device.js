import Vue from 'vue'

const ua = navigator.userAgent
const platform = navigator.platform
const iPad = /iPad/i.test(ua) || /iPad/.test(platform)
const iPod = /iPod/i.test(ua) || /iPod/.test(platform)
const iPhone = (/iPhone/i.test(ua) && !iPad) || /iPhone/.test(platform)
const android = /Android/i.test(ua)
const mobile = /Mobile/.test(ua)
const sw = 768
const mq = `(min-width: ${sw}px)`

Vue.mixin({
  data: () => ({
    isiPad: iPad,
    isiPod: iPod,
    isiPhone: iPhone,
    isIOS: iPad || iPod || iPhone,
    isAndroidPhone: android && mobile,
    isAndroidTablet: android && !mobile,
    sw,
    mq
  }),
  methods: {
    isMobileTablet () {
      return this.isiPhone || this.isiPad || this.isAndroidPhone
    },
    getIEVersion () {
      const msie = ua.indexOf('MSIE')
      const trident = ua.indexOf('Trident/')
      const edge = ua.indexOf('Edge/')
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
      }
      if (trident > 0) {
        const rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
      }
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
      }
      return false
    }
  }
})
