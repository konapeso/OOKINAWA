<template>
  <section
    id="character"
    class="p-top-character"
  >
    <div class="p-top-character__inner">
      <c-content-heading
        :src="hCharacter"
        :srcset="hCharacterPc"
        alt="CHARACTER"
        class-name="c-content-heading--character"
      />
      <div class="p-top-character__slider swiper-container">
        <div class="swiper-wrapper">
          <p-top-character-item
            v-for="item in items"
            :key="item.index"
            :item="item"
          />
        </div>
      </div>
      <c-slide-controls
        class-name="p-top-character__controls"
        @prev="onSlidePrev"
        @next="onSlideNext"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swiper from 'swiper/swiper-bundle.cjs'
import emitter from '@/helpers/observer/EventEmitter'
import resizer from '@/helpers/observer/Resizer'
import debounce from '@/helpers/debounce'
import { on } from '@/helpers/event'
import { EVENTS as MODAL_EVENTS } from '@/object/project/ModalGroup/index'
import PTopCharacterItem from '@/object/project/PTopCharacterItem'
import CContentHeading from '@/object/component/CContentHeading'
import CSlideControls from '@/object/component/CSlideControls'
import hCharacter from '@/assets/img/h-character.svg'
import hCharacterPc from '@/assets/img/h-character_pc.svg'

export const EVENTS = {
  ENTER: 'character:enter',
  LEAVE: 'character:leave',
  TRNASITION_START: 'character:transition-start',
  TRNASITION_END: 'character:transition-end'
}

export default {
  name: 'PTopCharacter',
  components: {
    PTopCharacterItem,
    CContentHeading,
    CSlideControls
  },
  data: () => ({
    hCharacter,
    hCharacterPc,
    swiper: null,
    observer: null,
    delegateFn: null,
    isDesktop: false,
    isEnter: false,
    slideParams: {
      rotate: 0,
      stretch: '-30%',
      scale: 0.7,
      modifier: 1,
      scaler: -1
    },
    swiperOptions: {
      direction: 'horizontal',
      slideActiveClass: 'is-character-active',
      slideNextClass: 'is-character-next',
      slidePrevClass: 'is-character-prev',
      speed: 1000,
      slidesPerView: 1,
      loop: true,
      init: false,
      breakpoints: {
        768: {
          slidesPerView: 2.35,
          mousewheel: {
            releaseOnEdges: true
          },
          centeredSlides: true,
          watchSlidesProgress: true
        },
        1941: {
          slidesPerView: 2.6,
          mousewheel: {
            releaseOnEdges: true
          },
          centeredSlides: true,
          watchSlidesProgress: true
        }
      }
    },
    items: [
      {
        modalId: 'ModalKuda',
        color: 'yellow',
        img: {
          src: require('@/assets/img/img-kuda.png'),
          alt: ''
        },
        summary: {
          name: 'kuda',
          ja: {
            src: require('@/assets/img/ja-kuda.svg'),
            alt: '久田 友太'
          },
          en: {
            src: require('@/assets/img/en-kuda.svg'),
            alt: 'YUTA KUDA'
          }
        }
      },
      {
        modalId: 'ModalAkamine',
        color: 'gray',
        img: {
          src: require('@/assets/img/img-akamine.png'),
          alt: ''
        },
        summary: {
          name: 'akamine',
          ja: {
            src: require('@/assets/img/ja-akamine.svg'),
            alt: '赤嶺 謙一郎'
          },
          en: {
            src: require('@/assets/img/en-akamine.svg'),
            alt: 'KENICHIRO AKAMINE'
          }
        }
      },
      {
        modalId: 'ModalYamashita',
        color: 'orange',
        img: {
          src: require('@/assets/img/img-yamashita.png'),
          alt: ''
        },
        summary: {
          name: 'yamashita',
          ja: {
            src: require('@/assets/img/ja-yamashita.svg'),
            alt: '山下 紘史'
          },
          en: {
            src: require('@/assets/img/en-yamashita.svg'),
            alt: 'HIROFUMI YAMASHITA'
          }
        }
      },
      {
        modalId: 'ModalShinjo',
        color: 'blue',
        img: {
          src: require('@/assets/img/img-shinjo.png'),
          alt: ''
        },
        summary: {
          name: 'shinjo',
          ja: {
            src: require('@/assets/img/ja-shinjo.svg'),
            alt: '新城 巨望'
          },
          en: {
            src: require('@/assets/img/en-shinjo.svg'),
            alt: 'NAOMI SHINJO'
          }
        }
      }
    ]
  }),
  computed: {
    ...mapGetters('media-query', ['device'])
  },
  watch: {
    device (matches) {
      this.isDesktop = matches
      if (matches) {
        this.swiper && this.swiper.mousewheel.enable()
      } else {
        this.swiper && this.swiper.mousewheel.disable()
      }
    }
  },
  beforeDestroy () {
    resizer.remove(this.debounceFn)
  },
  mounted () {
    this.isDesktop = window.innerWidth > this.sw - 1
    this.swiper = new Swiper('.p-top-character__slider', this.swiperOptions)
    this.isDesktop && this.swiper.mousewheel.enable()
    this.swiper.on('setTransition', this.setTransition)
    this.swiper.on('setTranslate', this.setTranslate)
    this.swiper.on('transitionStart', this.onTransitionStart)
    this.swiper.on('transitionEnd', this.onTransitionEnd)
    this.swiper.init()
    this.swiper.$el[0].classList.add('swiper-container-3d')
    this.delegateFn = on(document, 'click', this.onClickItem, false, '.p-top-character__slide-item')
    this.observer = new IntersectionObserver(this.onObserve, {
      threshold: 0
    })
    this.observer.observe(this.$el)
    this.debounceFn = debounce(this.onResize).bind(this)
    resizer.add(this.debounceFn)
    emitter.on(MODAL_EVENTS.CLOSE, this.onModalClose)
  },
  methods: {
    ...mapActions('modal', ['show']),
    onModalClose (modalId) {
      const target = this.$el.querySelector(`[data-modal-id="${modalId}"`)
      const index = +target.dataset.swiperSlideIndex
      this.onSlideChange(index, 0)
    },
    onObserve (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          emitter.emit(EVENTS.ENTER)
        } else {
          emitter.emit(EVENTS.LEAVE)
        }
      })
    },
    onResize () {
      this.setTranslate()
      this.swiper.update()
    },
    onSlidePrev () {
      this.swiper.slidePrev()
    },
    onSlideNext () {
      this.swiper.slideNext()
    },
    onSlideChange (index, duration = 800) {
      this.swiper.slideToLoop(index, duration)
    },
    onClickItem (e, target) {
      if (target) {
        const modalId = target.dataset.modalId
        this.show(modalId)
      }
    },
    onTransitionEnd () {
      emitter.emit(EVENTS.TRNASITION_END)
    },
    onTransitionStart () {
      emitter.emit(EVENTS.TRNASITION_START)
    },
    setTransition (swiper, duration) {
      this.swiper.slides.transition(duration).find('.p-top-character__slide-summary, .p-top-character__slide-view, .p-top-character__slide-circle').transition(duration)
    },
    setTranslate () {
      const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = this.swiper
      if (this.isDesktop) {
        const slideParams = this.slideParams
        const isHorizontal = this.swiper.isHorizontal()
        const transform = this.swiper.translate
        const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2
        const dir = this.isDesktop ? 1 : -1

        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i)
          const $textEl = $slideEl.find('.p-top-character__slide-summary')
          const $viewEl = $slideEl.find('.p-top-character__slide-view')
          const slideSize = slidesSizesGrid[i]
          const slideOffset = $slideEl[0].swiperSlideOffset
          const offsetMultiplier = ((center - slideOffset - slideSize / 2) / slideSize) * slideParams.modifier

          let stretch = slideParams.stretch

          if (typeof stretch === 'string' && stretch.includes('%')) {
            stretch = (parseFloat(slideParams.stretch) / 100) * slideSize
          }

          let translateY = isHorizontal ? dir * (stretch * offsetMultiplier) : 0
          let translateX = isHorizontal ? stretch * offsetMultiplier : 0
          let scale = 1 - (1 - slideParams.scale) * Math.abs(offsetMultiplier)

          if (Math.abs(translateX) < 0.001) translateX = 0
          if (Math.abs(translateY) < 0.001) translateY = 0
          if (Math.abs(scale) < 0.001) scale = 0

          const progress = $slideEl[0].progress
          const opacity = Math.max(1 - Math.abs(progress), 0)
          const textScale = Math.max(1 - Math.abs(progress), 0.8)
          const viewScale = Math.max(1 - Math.abs(progress), 0)

          $textEl.css({ opacity })
          $textEl.transform(`scale(${textScale})`)
          $viewEl.transform(`scale(${viewScale})`)
          $slideEl.transform(`translate3d(${translateX}px, ${(translateY / slideParams.scaler)}px, 0px) scale(${scale})`)
        }
      } else {
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i)
          const $textEl = $slideEl.find('.p-top-character__slide-summary')
          const $viewEl = $slideEl.find('.p-top-character__slide-view')
          $textEl.css({ opacity: 1 })
          $textEl.transform('scale(1)')
          $viewEl.transform('scale(1)')
          $slideEl.transform('translate3d(0px, 0px, 0px) scale(1)')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-top-character {
  position: relative;

  $block: &;

  @include pseudo(before) {
    @include position(absolute, $top: _vw(350, $size-sp), $left: 0);
    @include size(100%, 1);
    background-color: $color-gray-border;

    @include media(pc) {
      top: _vw(390, $size-pc);
      width: 120%;
      height: 2px;
      transform: rotate(-14deg) translateX(-5%);
    }
  }

  @include e(inner) {
    position: relative;
    z-index: 1;
  }

  @include e(slider) {
    @include media(pc) {
      overflow: visible;
    }
  }
}
</style>
