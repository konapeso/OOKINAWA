<template>
  <header class="l-header u-before-modal-opened">
    <c-site-name />
    <c-logo />
    <c-btn-menu @click="onClick" />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import resizer from '@/helpers/observer/Resizer'
import debounce from '@/helpers/debounce'
import CLogo from '@/object/component/CLogo'
import CSiteName from '@/object/component/CSiteName'
import CBtnMenu from '@/object/component/CBtnMenu'

export default {
  name: 'LHeader',
  components: {
    CLogo,
    CSiteName,
    CBtnMenu
  },
  data: () => ({
    debounceFn: null
  }),
  computed: {
    ...mapGetters('menu', ['shown', 'animating'])
  },
  beforeDestroy () {
    resizer.remove(this.debounceFn)
  },
  mounted () {
    this.debounceFn = debounce(this.onResize).bind(this)
    resizer.add(this.debounceFn)
  },
  methods: {
    onClick (e) {
      if (this.animating) return
      this.$store.dispatch('menu/toggle')
    },
    onResize () {
      const width = this.$el.offsetWidth
      this.html.style.setProperty('--hw', `${width}px`)
    }
  }
}
</script>

<style lang="scss" scoped>
.l-header {
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%, _half-px(100));
  padding: 8px 0;
  background-color: $color-light-gray;
  z-index: 4;

  @include media(pc) {
    left: auto;
    right: 0;
    @include size(_vw(138, $size-pc), 100%);
    max-width: 138px;
    min-width: 90px;
  }
}
</style>
