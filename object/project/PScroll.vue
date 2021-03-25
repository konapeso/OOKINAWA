<template>
  <div class="p-scroll u-before-modal-opened">
    <div
      ref="body"
      class="p-scroll__body"
    >
      <slot />
    </div>
    <div
      ref="fake"
      class="p-scroll__fake"
    />
  </div>
</template>

<script>
import emitter from '@/helpers/observer/EventEmitter'
import scroller from '@/helpers/observer/Scroller'
import resizer from '@/helpers/observer/Resizer'
import recorder from '@/helpers/observer/Recorder'
import debounce from '@/helpers/debounce'
import { setStyle } from '@/helpers/style'
import { fixed } from '@/helpers/math'

export const EVENTS = {
  RENDER: 'scroll:render'
}

export default {
  name: 'PScroll',
  props: {
    ease: {
      type: Number,
      default: 0.03
    }
  },
  data: () => ({
    isRafActive: false,
    debounceFn: null,
    isActivate: false,
    scroll: {
      target: 0,
      current: 0
    }
  }),
  beforeDestroy () {
    scroller.remove(this.onScroll)
    resizer.remove(this.debounceFn)
    recorder.remove(this.onRender)
    this.isRafActive = false
  },
  async mounted () {
    this.isActivate = false
    this.debounceFn = debounce(this.onResize).bind(this)
    scroller.add(this.onScroll)
    resizer.add(this.debounceFn)
    this.isActivate && this.$el.classList.add('is-activate')
    await this.$nextTick()
    setTimeout(() => this.onResize(), 500)
  },
  methods: {
    onScroll (pageYOffset) {
      this.scroll.target = pageYOffset
      this.onRender()
    },
    onResize () {
      if (this.isActivate) {
        setStyle(this.$refs.fake, {
          height: `${this.$refs.body.offsetHeight}px`
        })
      }
    },
    onRender () {
      const diff = this.scroll.target - this.scroll.current
      const delta = Math.abs(diff) < 0.1 ? 0 : diff * this.ease
      if (Math.abs(delta) > 0.1) {
        this.scroll.current += delta
        this.scroll.current = fixed(this.scroll.current)

        if (!this.isRafActive) {
          this.isRafActive = true
          recorder.add(this.onRender)
        }
      } else {
        this.scroll.current = this.scroll.target
        this.isRafActive = false
        recorder.remove(this.onRender)
      }

      emitter.emit(EVENTS.RENDER, this.scroll)

      if (this.isActivate) {
        setStyle(this.$refs.body, {
          transform: `translate3d(0, ${-1 * this.scroll.current}px, 0)`
        })
      }
    }
  }
}
</script>

<style lang="scss">
.p-scroll {
  position: relative;
  z-index: 1;

  @include e(body) {
    .is-activate & {
      overflow: hidden;
      @include position(fixed, $top: 0, $left: 0);
      width: 100%;
      z-index: 2;

      .is-modal-opened & {
        overflow-y: scroll;
      }
    }
  }

  @include e(fake) {
    width: 1px;
    pointer-events: none;
  }
}
</style>
