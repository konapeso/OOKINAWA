<template>
  <div class="p-bg" />
</template>

<script>
import { mapGetters } from 'vuex'
import SNoiseBackground from './SNoiseBackground'

export default {
  name: 'PBackground',
  data: () => ({
    background: null
  }),
  computed: {
    ...mapGetters('loading', ['activated'])
  },
  watch: {
    activated (isLoaded) {
      if (isLoaded) {
        this.animateIn()
      }
    }
  },
  mounted () {
    if (!this.background) {
      this.background = new SNoiseBackground(this.$el)
      this.$el.style.backgroundImage = 'none'
    }
  },
  methods: {
    animateIn () {
      this.background.animateIn()
    }
  }
}
</script>

<style lang="scss" scoped>
.p-bg {
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%, 100vh);
  background-image: url(~@/assets/img/circle.png);
}
</style>
