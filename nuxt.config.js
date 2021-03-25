
const base = process.env.BASE_DIR || '/'
const META = {
  TITLE: 'OOKINAWA',
  DESCRIPTION: 'OOKINAWA(おおきなわ)は沖縄でもっとも共創性があるクリエイティブ集団を目指しています。',
  OG_URL: 'https://ookinawa.world',
  OG_IMG: 'https://ookinawa.world/og.png'
}

export default {
  /**
   * ターミナルに出るので非表示に。
   */
  telemetry: false,
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: META.TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: META.DESCRIPTION },
      { hid: 'og:site_name', property: 'og:site_name', content: META.TITLE },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: META.OG_URL },
      { hid: 'og:title', property: 'og:title', content: META.TITLE },
      { hid: 'og:description', property: 'og:description', content: META.DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: META.OG_IMG },
      { hid: 'article:publisher', content: 'https://www.facebook.com/OOKINAWA2020/' },
      { hid: 'fb:app_id', content: '369924044022935' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ookinawa2020' },
      { name: 'twitter:title', content: META.TITLE },
      { name: 'twitter:url', content: META.OG_URL },
      { name: 'twitter:description', content: META.DESCRIPTION },
      { name: 'twitter:image', content: META.OG_IMG }
    ],
    link: [
      { rel: 'shortcut icon', href: `${base}favicon.ico` },
      { rel: 'apple-touch-icon', sizes: '76x76', href: `${base}apple-touch-icon.png` },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${base}favicon-16x16.png` },
      { rel: 'canonical', href: META.OG_URL }
    ],
    script: [
      { src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver' }
    ],
    base: {
      href: 'router.base'
    }
  },
  /**
   * Customize the progress bar color
   */
  loading: '~/object/component/CLoader.vue',
  /*
   ** Global CSS
   */
  css: [],
  styleResources: {
    scss: ['~assets/scss/style.scss']
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '~plugins/mixins/device',
      mode: 'client'
    },
    {
      src: '~plugins/mixins/dom',
      mode: 'client'
    },
    {
      src: '~plugins/directive/magnet-mouse',
      mode: 'client'
    },
    {
      src: '~plugins/sanitize'
    }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-176814631-1'
    // }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/gtm',
    [
      '@nuxtjs/google-gtag',
      {
        id: 'UA-176814631-1'
      }
    ]
  ],
  gtm: {
    id: 'GTM-N6RG67W'
  },
  router: {
    base
    // extendRoutes (routes, resolve) {
    //   routes.push({
    //     name: 'custom',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/index.vue')
    //   })
    // }
  },
  generate: {
    fallback: '404.html'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // if (!ctx.isDev) {
      //   config.output.publicPath = './_nuxt/'
      // }
      if (config.module) {
        config.module.rules.push({ test: /\.(vs|fs|vert|frag|glsl)$/i, use: ['raw-loader', 'glslify-loader'] })
      }
    }
  },
  svgSprite: {
    elementClass: 'u-ico',
    spriteClassPrefix: null,
    svgSprite: {
      input: '~/assets/sprite/svg/'
    }
  },
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /^is-./]
  }
}
