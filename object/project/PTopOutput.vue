<template>
  <section
    id="output"
    class="p-top-output"
  >
    <div class="p-top-output__inner">
      <c-content-heading
        :src="hOutput"
        :srcset="hOutputPc"
        alt="OUTPUT"
        class-name="c-content-heading--output"
      />
      <div class="p-top-output__slider swiper-container">
        <div class="swiper-wrapper">
          <p-top-output-item
            v-for="item in items"
            :key="item.index"
            :item="item"
          />
        </div>
      </div>
    </div>
    <c-slide-controls
      class-name="p-top-output__controls"
      @prev="onSlidePrev"
      @next="onSlideNext"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import PTopOutputItem from '@/object/project/PTopOutputItem'
import CContentHeading from '@/object/component/CContentHeading'
import CSlideControls from '@/object/component/CSlideControls'
import hOutput from '@/assets/img/h-output.svg'
import hOutputPc from '@/assets/img/h-output_pc.svg'
import Swiper from 'swiper/swiper-bundle.cjs'

export default {
  name: 'PTopOutput',
  components: {
    PTopOutputItem,
    CContentHeading,
    CSlideControls
  },
  data: () => ({
    hOutput,
    hOutputPc,
    swiper: null,
    isDesktop: false,
    slideParams: {
      rotate: 0,
      stretch: '-8%',
      scale: 1,
      modifier: 1.8,
      scaler: 0.105
    },
    swiperOptions: {
      slideActiveClass: 'is-output-active',
      slideNextClass: 'is-output-next',
      slidePrevClass: 'is-output-prev',
      speed: 1000,
      slidesPerView: 2,
      centeredSlides: true,
      watchSlidesProgress: true,
      loop: true,
      init: false,
      breakpoints: {
        768: {
          slidesPerView: 3.25
        }
      }
    },
    items: [
      {
        number: 1,
        gtagLabel: 'top_output_200930_01',
        color: 'blue',
        cat: 'note',
        date: '2020.09.30',
        href: 'https://note.com/ookinawa/n/n387f5b50d419',
        img: {
          src: require('@/assets/img/img-output-note01.png'),
          alt: '沖縄を豊かにするクリエイティブサークル「OOKINAWA」の誕生秘話を直撃！'
        },
        title: '沖縄を豊かにするクリエイティブサークル「OOKINAWA」の誕生秘話を直撃！',
        text: '2020年8月8日に発足したクリエイティブサークル「OOKINAWA（おおきなわ）」メンバーに直撃インタビュー！'
      },
      {
        number: 2,
        gtagLabel: 'top_output_200808',
        color: 'yellow',
        cat: 'イベント',
        date: '2020.08.08',
        href: null,
        img: {
          src: require('@/assets/img/img-now-printing.png'),
          alt: ''
        },
        title: 'Coming soon...',
        text: 'Coming soon...'
      },
      {
        number: 3,
        gtagLabel: 'top_output_200808',
        color: 'yellow',
        cat: 'YouTube',
        date: '2020.08.08',
        href: null,
        img: {
          src: require('@/assets/img/img-now-printing.png'),
          alt: ''
        },
        title: 'Coming soon...',
        text: 'Coming soon...'
      }
    ]
  }),
  computed: {
    ...mapGetters('media-query', ['device'])
  },
  watch: {
    device (matches) {
      this.isDesktop = matches
      this.changeLayout(matches)
    }
  },
  mounted () {
    this.isDesktop = window.innerWidth > this.sw - 1
    this.swiper = new Swiper('.p-top-output__slider', this.swiperOptions)
    this.swiper.on('setTransition', this.setTransition)
    this.swiper.on('setTranslate', this.setTranslate)
    this.swiper.init()
    this.swiper.$el[0].classList.add('swiper-container-3d')

    this.changeLayout(this.isDesktop)
  },
  methods: {
    onSlidePrev () {
      this.swiper.slidePrev()
    },
    onSlideNext () {
      this.swiper.slideNext()
    },
    changeLayout (matches) {
      this.slideParams.scaler = matches ? 1.14 : 0.105
      this.slideParams.modifier = matches ? 2.3 : 1.8
      this.slideParams.scale = matches ? 0.92 : 1
      // this.slideParams.stretch = matches ? '-8%' : '-8%'
      this.setTranslate()
    },
    setTransition (swiper, duration) {
      this.swiper.slides.transition(duration).find('.p-top-output__slide-summary, .p-top-output__slide-img, .p-top-output__slide-meta, p-top-output__slide-circle-wrap, .p-top-output__slide-circle').transition(duration)
    },
    setTranslate () {
      const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = this.swiper
      const slideParams = this.slideParams
      const isHorizontal = this.swiper.isHorizontal()
      const transform = this.swiper.translate
      const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2
      const dir = this.isDesktop ? 1 : -1

      for (let i = 0, length = slides.length; i < length; i += 1) {
        const $slideEl = slides.eq(i)
        const $imgEl = $slideEl.find('.p-top-output__slide-img')
        const $textEl = $slideEl.find('.p-top-output__slide-summary')
        const $metaEl = $slideEl.find('.p-top-output__slide-meta')
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

        $slideEl.transform(`translate3d(${translateX}px, ${(translateY / slideParams.scaler)}px, 0px)`)
        $imgEl.transform(`scale(${Math.abs(scale)})`)

        if (!this.isDesktop) {
          // text effect
          const opacity = Math.max(1 - Math.abs($slideEl[0].progress), 0)
          const textScale = Math.max(1 - Math.abs($slideEl[0].progress), 0.5)
          $metaEl.css({ opacity })
          $textEl.css({ opacity })
          $textEl.transform(`scale(${textScale})`)
        } else {
          $textEl.css({ opacity: 1 })
          $textEl.transform('scale(1)')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-top-output {
  position: relative;
  margin-top: _vw(400, $size-sp);
  padding-top: _vw(80, $size-sp);
  padding-bottom: _vw(240, $size-sp);

  @include media(pc) {
    margin-top: _vw(180, $size-pc);
    padding-top: 0;
    padding-bottom: _vw(220, $size-pc);
  }

  @include pseudo(before) {
    @include position(absolute, $top: _vw(100, $size-sp), $left: 0);
    @include size(200%, 1);
    transform: rotate(-50deg) translateX(-30%);
    transform-origin: 27% 0;
    background-color: $color-gray-border;

    @include media(pc) {
      top: _vw(236, $size-pc);
      width: 120%;
      height: 2px;
      transform: rotate(7.6deg) translateX(-5%);
    }
  }

  @include e(inner) {
    position: relative;
    z-index: 1;

    @include media(pc) {
      padding: 0 0 0 _vw(320, $size-pc);
    }
  }

  @include e(slider) {
    overflow: visible;
    position: relative;

    @include media(pc) {
      overflow: hidden;
      width: _vw(1080, $size-pc);
      max-width: 1080px;
      margin: 0 auto;
    }
  }
}
</style>
