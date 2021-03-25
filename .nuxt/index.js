import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_0dd80722 from 'nuxt_plugin_plugin_0dd80722' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_googlegtag_91418c32 from 'nuxt_plugin_googlegtag_91418c32' // Source: ./google-gtag.js (mode: 'client')
import nuxt_plugin_gtm_35070a0e from 'nuxt_plugin_gtm_35070a0e' // Source: ./gtm.js (mode: 'all')
import nuxt_plugin_nuxtsvgsprite_2f4deb54 from 'nuxt_plugin_nuxtsvgsprite_2f4deb54' // Source: ./nuxt-svg-sprite.js (mode: 'all')
import nuxt_plugin_device_27169f08 from 'nuxt_plugin_device_27169f08' // Source: ../plugins/mixins/device (mode: 'client')
import nuxt_plugin_dom_404f94dc from 'nuxt_plugin_dom_404f94dc' // Source: ../plugins/mixins/dom (mode: 'client')
import nuxt_plugin_magnetmouse_46e3b6d9 from 'nuxt_plugin_magnetmouse_46e3b6d9' // Source: ../plugins/directive/magnet-mouse (mode: 'client')
import nuxt_plugin_sanitize_6ae88940 from 'nuxt_plugin_sanitize_6ae88940' // Source: ../plugins/sanitize (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"OOKINAWA","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"OOKINAWA(おおきなわ)は沖縄でもっとも共創性があるクリエイティブ集団を目指しています。"},{"hid":"og:site_name","property":"og:site_name","content":"OOKINAWA"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:url","property":"og:url","content":"https:\u002F\u002Fookinawa.world"},{"hid":"og:title","property":"og:title","content":"OOKINAWA"},{"hid":"og:description","property":"og:description","content":"OOKINAWA(おおきなわ)は沖縄でもっとも共創性があるクリエイティブ集団を目指しています。"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Fookinawa.world\u002Fog.png"},{"hid":"article:publisher","content":"https:\u002F\u002Fwww.facebook.com\u002FOOKINAWA2020\u002F"},{"hid":"fb:app_id","content":"369924044022935"},{"name":"twitter:card","content":"summary_large_image"},{"name":"twitter:site","content":"@ookinawa2020"},{"name":"twitter:title","content":"OOKINAWA"},{"name":"twitter:url","content":"https:\u002F\u002Fookinawa.world"},{"name":"twitter:description","content":"OOKINAWA(おおきなわ)は沖縄でもっとも共創性があるクリエイティブ集団を目指しています。"},{"name":"twitter:image","content":"https:\u002F\u002Fookinawa.world\u002Fog.png"}],"link":[{"rel":"shortcut icon","href":"\u002Ffavicon.ico"},{"rel":"apple-touch-icon","sizes":"76x76","href":"\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon-16x16.png"},{"rel":"canonical","href":"https:\u002F\u002Fookinawa.world"}],"script":[{"src":"https:\u002F\u002Fpolyfill.io\u002Fv2\u002Fpolyfill.min.js?features=IntersectionObserver"}],"base":{"href":"router.base"},"style":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_0dd80722 === 'function') {
    await nuxt_plugin_plugin_0dd80722(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googlegtag_91418c32 === 'function') {
    await nuxt_plugin_googlegtag_91418c32(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_35070a0e === 'function') {
    await nuxt_plugin_gtm_35070a0e(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtsvgsprite_2f4deb54 === 'function') {
    await nuxt_plugin_nuxtsvgsprite_2f4deb54(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_device_27169f08 === 'function') {
    await nuxt_plugin_device_27169f08(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_dom_404f94dc === 'function') {
    await nuxt_plugin_dom_404f94dc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_magnetmouse_46e3b6d9 === 'function') {
    await nuxt_plugin_magnetmouse_46e3b6d9(app.context, inject)
  }

  if (typeof nuxt_plugin_sanitize_6ae88940 === 'function') {
    await nuxt_plugin_sanitize_6ae88940(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
