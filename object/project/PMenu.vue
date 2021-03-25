<template>
  <nav class="p-menu">
    <div
      ref="inner"
      class="p-menu__inner"
    >
      <div class="p-menu__body">
        <ul class="p-menu__list">
          <li
            v-for="item in items"
            :key="item.index"
            class="p-menu__item"
          >
            <a
              v-magnet-mouse
              :href="item.href"
              :class="`p-menu__link--${item.href.substring(1)}`"
              class="p-menu__link"
              :data-gtag-label="item.href.substring(1)"
              @click.prevent="onClickAnchor($event, $event.target)"
            >
              <img
                :src="item.src"
                :alt="item.alt"
              >
            </a>
          </li>
        </ul>
        <dl class="p-menu__share">
          <dt class="p-menu__share-dt">
            <img
              src="@/assets/img/menu-share.svg"
              alt="Share"
            >
          </dt>
          <dd class="p-menu__share-dd">
            <c-share-link
              v-magnet-mouse="{ perspective: 0 }"
              class="p-menu__share-link p-menu__share-link--tw"
              data-gtag-label="share_twitter"
            >
              <svg-icon
                name="twitter"
                title="twitter"
                class="p-menu__share-btn p-menu__share-btn--tw"
                width="73"
                height="63"
              />
            </c-share-link>
            <c-share-link
              v-magnet-mouse="{ perspective: 0 }"
              sns="facebook"
              class="p-menu__share-link p-menu__share-link--fb"
              data-gtag-label="share_facebook"
            >
              <svg-icon
                name="facebook"
                title="facebook"
                class="p-menu__share-btn p-menu__share-btn--fb"
                width="72"
                height="77"
              />
            </c-share-link>
          </dd>
        </dl>
        <p class="p-menu__copyright u-block-sp">
          <img
            src="@/assets/img/menu-copyright.svg"
            alt="COPYRIGHT © 2020 OOKINAWA ALLRIGHTS RESERVED."
          >
        </p>
      </div>
    </div>
    <div
      ref="overlay"
      class="p-menu__overlay"
      @click="onClickOverlay"
    />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'
import { isNumber } from '@/helpers/is'
import getSelectorFromElement from '@/helpers/getSelectorFromElement'
import CShareLink from '@/object/component/CShareLink'
import menuTop from '@/assets/img/menu-top.svg'
import menuAbout from '@/assets/img/menu-about.svg'
import menuCharacter from '@/assets/img/menu-character.svg'
import menuOutput from '@/assets/img/menu-output.svg'
import menuConnect from '@/assets/img/menu-connect.svg'

export default {
  name: 'PMenu',
  components: {
    CShareLink
  },
  data: () => ({
    duration: 0.6,
    easing: 'power3.out',
    isDesktop: false,
    items: [
      {
        src: menuTop,
        alt: 'TOP',
        href: '#top'
      },
      {
        src: menuAbout,
        alt: 'ABOUT',
        href: '#about'
      },
      {
        src: menuCharacter,
        alt: 'CHARACTER',
        href: '#character'
      },
      {
        src: menuOutput,
        alt: 'OUTPUT',
        href: '#output'
      },
      {
        src: menuConnect,
        alt: '繋がる',
        href: '#connect'
      }
    ]
  }),
  computed: {
    ...mapGetters('menu', ['shown', 'animating']),
    ...mapGetters('media-query', ['device'])
  },
  watch: {
    shown (isShown) {
      isShown ? this.open() : this.close()
    },
    device (matches) {
      this.isDesktop = matches
    }
  },
  mounted () {
    this.isDesktop = window.innerWidth > this.sw - 1
  },
  methods: {
    onClickAnchor (e) {
      const el = getSelectorFromElement(e.target)
      this.$store.dispatch('menu/toggle')
      this.scrollTo(el || 0, {
        offset: !this.isDesktop ? 50 : 0,
        duration: 1
      })
    },
    onClickOverlay (e) {
      if (this.animating) return
      this.$store.dispatch('menu/toggle')
    },
    scrollTo (element, { offset = 0, duration = 1, delay = 0, ease = 'expo.out' } = {}) {
      if (gsap.isTweening('html, body')) {
        return
      }

      const { pageYOffset } = window
      const distance = isNumber(element)
        ? element - offset
        : element.getBoundingClientRect().top + pageYOffset - offset

      return gsap.to('html, body', duration, {
        scrollTop: distance,
        delay,
        ease
      })
    },
    async open () {
      this.$store.commit('menu/start')
      this.html.classList.add(...['is-menu-opened', 'is-animating'])
      await gsap.from([this.$refs.inner, this.$refs.overlay], {
        x: '100%',
        duration: this.duration,
        ease: this.easing
      })
      this.$store.commit('menu/end')
    },
    async close () {
      this.$store.commit('menu/start')
      this.html.classList.remove('is-animating')
      await gsap.to([this.$refs.inner, this.$refs.overlay], {
        x: '100%',
        duration: this.duration,
        ease: this.easing
      })
      this.html.classList.remove('is-menu-opened')
      gsap.set([this.$refs.inner, this.$refs.overlay], { clearProps: 'transform' })
      this.$store.commit('menu/end')
    }
  }
}
</script>

<style lang="scss" scoped>
.p-menu {
  display: none;
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%);
  z-index: 3;

  .is-menu-opened & {
    display: block;
  }

  @include e(inner) {
    position: relative;
    overflow-y: scroll;
    @include size(100%);
    @include center-flex();
    flex-direction: column;
    z-index: 1;

    @include media(pc) {
      align-items: start;
      flex-direction: row;
      width: calc(600px + #{_vw(138, $size-pc)});
      margin-left: auto;
      // margin-right: 130px;
      background-color: $color-light-gray;
    }
  }

  @include e(body) {
    @include center(_vw(606, $size-sp));

    @include media(pc) {
      width: 330px;
      padding: 50px 0;
    }
  }

  @include e(overlay) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
    background-color: $color-light-gray;

    @include media(pc) {
      background-color: transparent;
    }
  }

  @include e(item) {
    margin-top: 40px;

    &:first-child {
      margin-top: 44px;
    }

    @include media(pc) {
      margin-top: 68px;
      &:first-child {
        margin-top: 76px;
      }
    }
  }

  @include e(link) {
    display: block;
    position: relative;

    @include media(pc) {
      @include pseudo(before) {
        @include position(absolute, $top: 50%, $left: -3px);
        @include size(calc(100% + 6px), 4);
        margin-top: -2px;
        background-color: black;
        transform: scaleX(0);
        transform-origin: right top;
        transition: transform 0.3s $ease-out-cubic;
      }

      &:hover {
        @include pseudo(before) {
          transform: scaleX(1);
          transform-origin: left top;
        }
      }
    }

    > img {
      pointer-events: none;
    }

    @include m(top) {
      width: _vw(111, $size-sp);

      @include media(pc) {
        width: _vw(103, $size-pc);
        max-width: 103px;
      }
    }

    @include m(about) {
      width: _vw(197, $size-sp);

      @include media(pc) {
        width: _vw(180, $size-pc);
        max-width: 180px;
      }
    }

    @include m(character) {
      width: _vw(351, $size-sp);

      @include media(pc) {
        width: _vw(323, $size-pc);
        max-width: 323px;
      }
    }

    @include m(output) {
      width: _vw(229, $size-sp);

      @include media(pc) {
        width: _vw(211, $size-pc);
        max-width: 211px;
      }
    }

    @include m(connect) {
      width: _vw(233, $size-sp);

      @include media(pc) {
        width: _vw(215, $size-pc);
        max-width: 215px;
      }
    }
  }

  @include e(share) {
    margin-top: 44px;

    @include media(pc) {
      margin-top: 140px;
    }
  }

  @include e(share-dt) {
    width: _vw(91, $size-sp);

    @include media(pc) {
      width: _vw(91, $size-pc);
      max-width: 91px;
    }
  }

  @include e(share-dd) {
    display: flex;
    margin-top: 10px;

    @include media(pc) {
      margin-top: 0;
    }
  }

  @include e(share-btn) {
    height: auto;

    @include m(tw) {
      width: _vw(73, $size-sp);

      @include media(pc) {
        width: _vw(73, $size-pc);
        max-width: 73px;
      }
    }

    @include m(fb) {
      width: _vw(72, $size-sp);

      @include media(pc) {
        width: _vw(72, $size-pc);
        max-width: 72px;
      }
    }
  }

  @include e(share-link) {
    position: relative;
    @include center-flex();
    svg {
      fill: $color-sns;
      transition: fill 0.5s $ease-out-cubic;
    }

    &:hover {
      svg {
        fill: $color-sns-hover;
      }
    }

    @include media(pc) {
      margin-top: 30px;
    }

    @include m(tw) {
      width: _vw(73, $size-sp);

      @include media(pc) {
        width: _vw(73, $size-pc);
        max-width: 73px;
      }
    }

    @include m(fb) {
      width: _vw(72, $size-sp);
      margin-left: 24px;

      @include media(pc) {
        width: _vw(72, $size-pc);
        max-width: 72px;
        margin-left: 40px;
      }
    }
  }

  @include e(copyright) {
    width: _vw(483, $size-sp);
    margin-top: 40px;
  }
}
</style>
