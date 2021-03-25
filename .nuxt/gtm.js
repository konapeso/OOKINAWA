// This is a mock version because gtm module is disabled
// You can explicitly enable module using `gtm.enabled: true` in nuxt.config

const _layer = 'dataLayer'
const _id = 'GTM-N6RG67W'

function startPageTracking (ctx) {
  ctx.app.router.afterEach((to) => {
    setTimeout(() => {
      ctx.$gtm.push(to.gtm || {
        routeName: to.name,
        pageType: 'PageView',
        pageUrl: '' + to.fullPath,
        pageTitle: (typeof document !== 'undefined' && document.title) || '',
        event: 'nuxtRoute'
      })
    }, 250)
  })
}

export default function (ctx, inject) {
  // eslint-disable-next-line no-console
  const logSyle = 'background: #2E495E;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em;'
  const log = (...args) => console.log('%cGTM', logSyle, ...args)

  const gtm = {
    init: (id) => {
      log('init', id)
    },
    push: (event) => {
      log('push', process.client ? event : JSON.stringify(event))
    }
  }

  ctx.$gtm = gtm
  inject('gtm', gtm)
}
