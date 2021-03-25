<template>
  <div
    v-if="isLoading"
    class="c-loader"
  />
</template>

<script>
import { gsap } from 'gsap'

export default {
  data: () => ({
    isLoading: true
  }),
  mounted () {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await gsap.to(this.$el, {
        autoAlpha: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out'
      })
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    start () {
      this.isLoading = true
    },
    finish () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.c-loader {
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%);
  background-color: white;
  z-index: 999;

  &.transition-loading {
    transition: opacity 0.5s ease;
  }
}
</style>
