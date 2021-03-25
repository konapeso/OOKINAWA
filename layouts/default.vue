<template>
  <div class="l-wrapper">
    <p-alert :is-display="isDisplayAlert" />
    <l-header />
    <Nuxt />
    <p-background />
    <p-menu />
  </div>
</template>

<script>
import LHeader from '@/layout/LHeader'
import PMenu from '@/object/project/PMenu'
import PBackground from '@/object/project/PBackground/index'
import matchMedia from '@/helpers/matchMedia'
import PAlert from '@/object/project/PAlert'
import { on } from '@/helpers/event'
import 'swiper/swiper-bundle.css'

export default {
  components: {
    LHeader,
    PMenu,
    PBackground,
    PAlert
  },
  data: () => ({
    isDisplayAlert: false
  }),
  mounted () {
    this.isDisplayAlert = this.getIEVersion()
    if (this.isDisplayAlert) {
      this.html.classList.add('is-floating')
    }
    matchMedia(this.mq, this.onMatchMedia)
    on(document.body, 'click', this.onClickGtag, false, '[data-gtag-label]')
  },
  methods: {
    onMatchMedia (matches) {
      this.$store.commit('media-query/change', { matches })
    },
    onClickGtag (e, el) {
      const label = el.dataset.gtagLabel
      this.$gtag('event', 'Clickview', {
        event_category: 'Pageview',
        event_label: label
      })
    }
  }
}
</script>

<style lang="scss">
// Foundation
@import "~sanitize.css";
@import "~assets/scss/foundation/base";
// Object -> Utility
@import "~assets/scss/object/utility";
</style>
