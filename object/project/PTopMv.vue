<template>
  <div class="p-top-mv u-before-modal-opened">
    <div class="p-top-mv__inner">
      <div
        ref="textbox"
        class="p-top-mv__textbox"
      >
        <div
          ref="copy1"
          class="p-top-mv__copy p-top-mv__copy--1"
          data-parallax="text"
        >
          <img
            src="@/assets/img/mv-copy-1.svg"
            alt="沖縄を"
          >
        </div>
        <div
          ref="copy2"
          class="p-top-mv__copy p-top-mv__copy--2"
          data-parallax="text"
        >
          <img
            src="@/assets/img/mv-copy-2.svg"
            alt="豊かにする"
          >
        </div>
        <c-picture
          ref="text"
          data-parallax="text"
          :src="mvText"
          :srcset="mvTextPc"
          class-name="p-top-mv__text"
          alt="CREATIVE CIRCLE"
        />
      </div>
      <p
        ref="sitename"
        data-parallax="sitename"
        class="p-top-mv__sitename u-block-pc"
      >
        <svg-icon
          name="site-name"
          title="OOKINAWA"
          class="p-top-mv__sitename-svg"
          width="161.5"
          height="20.281"
        />
      </p>
      <div
        ref="arrow"
        data-parallax="arrow"
        class="p-top-mv__arrow u-block-pc"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="21px"
          height="51px"
        >
          <path
            fill-rule="evenodd"
            stroke="rgb(0, 0, 0)"
            stroke-width="4px"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill="none"
            d="M4.355,2.547 L4.355,41.547 L15.355,30.547 "
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'
import { EVENTS } from '@/object/project/PScroll'
import emitter from '@/helpers/observer/EventEmitter'
import delay from '@/helpers/delay'
import { trigger } from '@/helpers/event'
import CPicture from '@/object/component/CPicture'
import mvText from '@/assets/img/mv-text.svg'
import mvTextPc from '@/assets/img/mv-text_pc.svg'

export default {
  name: 'PTopMv',
  components: {
    CPicture
  },
  data: () => ({
    mvText,
    mvTextPc,
    appearTl: null,
    disappearTl: null,
    isDesktop: false,
    isPlaying: false
  }),
  computed: {
    ...mapGetters('loading', ['activated']),
    ...mapGetters('media-query', ['device'])
  },
  watch: {
    async activated (isLoaded) {
      this.body.classList.add('is-opening')
      if (isLoaded) {
        if (!this.appearTl) {
          this.createTimeline()
        }
        await delay(2500)
        await this.appear()
        this.body.classList.remove('is-opening')
        trigger(window, 'resize')
      }
    },
    device (matches) {
      this.isDesktop = matches
    }
  },
  async mounted () {
    await this.$nextTick()
    this.isDesktop = window.innerWidth > this.sw - 1
    emitter.on(EVENTS.RENDER, this.onScroll)
    this.disappearTl = gsap.timeline({ paused: true })
    this.createParallax()
  },
  methods: {
    onScroll ({ target, current }) {
      if (this.disappearTl && !this.isPlaying) {
        this.disappearTl.time(current)
      }
    },
    createParallax () {
      const { innerHeight } = window
      const duration = innerHeight * 0.4
      const isDesktop = this.isDesktop

      ;[this.$refs.copy1, this.$refs.copy2, this.$refs.text.$el, this.$refs.arrow, this.$refs.sitename].forEach((el, i) => {
        const tl = gsap.timeline()
        let sceneStart = 0
        switch (el.dataset.parallax) {
          case 'text': {
            const threshold = 0.1
            sceneStart = innerHeight * threshold

            if (el.classList.contains('p-top-mv__text') && !isDesktop) {
              tl
                .to(el, { y: 40, autoAlpha: 0, delay: i * 0.03, ease: 'power3.easeout' })
                .duration(duration)
              break
            }
            tl
              .to(el, { x: -40, autoAlpha: 0, delay: i * 0.03, ease: 'power3.easeout' })
              .duration(duration)
            break
          }
          case 'arrow': {
            const threshold = 0.15
            sceneStart = innerHeight * threshold
            tl
              .to(el, { y: -40, autoAlpha: 0, delay: i * 0.02, ease: 'power3.easeout' })
              .duration(duration)
            break
          }
          case 'sitename': {
            const threshold = 0.15
            sceneStart = innerHeight * threshold
            tl
              .to(el, { y: 40, autoAlpha: 0, delay: (i - 1) * 0.02, ease: 'power3.easeout' })
              .duration(duration)
          }
        }
        this.disappearTl.add(tl, sceneStart)
      })
    },
    createTimeline () {
      const duration = 1
      this.appearTl = gsap.timeline({ paused: true })

      // appear
      if (this.isDesktop) {
        this.appearTl
          .fromTo([this.$refs.copy1, this.$refs.copy2, this.$refs.text.$el],
            {
              autoAlpha: 0,
              x: -40
            },
            {
              duration,
              autoAlpha: 1,
              x: 0,
              stagger: 0.1,
              ease: 'power3.easeout'
            }
          )
      } else {
        this.appearTl
          .from([this.$refs.copy1, this.$refs.copy2], {
            duration,
            autoAlpha: 0,
            x: -30,
            stagger: 0.1,
            ease: 'power3.easeout'
          })
          .from(this.$refs.text.$el, {
            duration,
            y: 30,
            autoAlpha: 0,
            ease: 'power3.easeout'
          }, '>-1.2')
      }

      this.appearTl.from(this.$refs.sitename, {
        duration,
        autoAlpha: 0,
        y: 40,
        ease: 'power3.easeout'
      }, '>-1')

      this.appearTl.from(this.$refs.arrow, {
        duration,
        autoAlpha: 0,
        y: -40,
        ease: 'power3.easeout'
      }, '>-1')
    },
    async appear () {
      this.isPlaying = true
      await this.appearTl.play(0)
      this.isPlaying = false
    },
    hidden () {
      gsap.set([this.$refs.copy1, this.$refs.copy2, this.$refs.text.$el, this.$refs.sitename, this.$refs.arrow], {
        autoAlpha: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.p-top-mv {
  display: flex;
  align-items: center;
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%, 100vh);
  padding: 50px 0 0;
  z-index: 1;

  // Safari用のCSSハック
  @supports (-webkit-touch-callout: none) {
    height: calc(100vh - 50px);
  }

  @include media(pc) {
    display: block;
    width: calc(100% - #{_vw(138, $size-pc)});
    width: calc(100% - var(--hw));
    padding: 0;
  }

  @include e(inner) {
    position: relative;
    width: 100%;

    @include media(pc) {
      display: flex;
      align-items: center;
      @include size(100%);
      max-width: 1662px;
      margin: 0 auto;
      padding: 0 60px;
    }
  }

  @include e(textbox) {
    @include media(pc) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      width: _vw(386, $size-pc);
      max-width: 386px;
    }
  }

  @include e(copy) {
    width: _vw(91, $size-sp);

    @include m(1) {
      @include position(absolute, $top: 0, $right: _vw(50, $size-sp));

      @include media(pc) {
        position: static;
        width: _vw(93, $size-pc);
        max-width: 93px;
      }
    }

    @include m(2) {
      width: _vw(89, $size-sp);
      margin: 0 _vw(188, $size-sp) 0 auto;

      @include media(pc) {
        width: _vw(91, $size-pc);
        max-width: 91px;
        margin: 0 0 0 28px;
      }
    }
  }

  @include e(text) {
    width: _vw(337, $size-sp);
    margin: 22px 0 0 26px;

    @include media(pc) {
      width: _vw(48.5, $size-pc);
      max-width: 48.5px;
      margin: 7px 0 0;
    }
  }

  @include e(sitename) {
    @include position(
      absolute,
      $bottom: _vw(50, $size-pc),
      $right: _vw(60, $size-pc)
    );
  }

  @include e(sitename-svg) {
    @include media(pc) {
      display: block;
      width: _vw(252, $size-pc);
      max-width: 252px;
      height: 100%;
      margin: 0 0 0 auto;
    }
  }

  @include e(arrow) {
    @include position(
      absolute,
      $bottom: _vw(50, $size-pc),
      $left: _vw(30, $size-pc)
    );

    @include media(xl) {
      left: 0px;
    }
  }
}
</style>
