<template>
  <section
    id="about"
    class="p-top-about"
  >
    <div class="p-top-about__inner">
      <c-content-heading
        :src="hAbout"
        :srcset="hAboutPc"
        alt="ABOUT"
        class-name="c-content-heading--about"
      />
      <!-- desktop -->
      <div
        v-if="isDesktop"
        ref="container"
        class="p-top-about__container"
      >
        <p
          v-for="(text, i) in textData.pc"
          ref="text"
          :key="text.index"
          :class="[`p-top-about__text--${i + 1}`]"
          class="p-top-about__text"
        >
          <img
            :src="text.src"
            :alt="text.alt"
          >
        </p>
      </div>
      <!-- smartphone -->
      <div
        v-else
        ref="container"
        class="p-top-about__container"
      >
        <p
          v-for="(text, i) in textData.sp"
          ref="text"
          :key="text.index"
          :class="[`p-top-about__text--${i + 1}`]"
          class="p-top-about__text"
        >
          <img
            :src="text.src"
            :alt="text.alt"
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOffset } from '@/helpers/dom'
import { EVENTS } from '@/object/project/PScroll'
import emitter from '@/helpers/observer/EventEmitter'
import resizer from '@/helpers/observer/Resizer'
import CContentHeading from '@/object/component/CContentHeading'
import ScrollTrigger from '@/object/utility/ScrollTrigger'
import hAbout from '@/assets/img/h-about.svg'
import hAboutPc from '@/assets/img/h-about_pc.svg'
// SP
import spText1 from '@/assets/img/text-about-1.svg'
import spText2 from '@/assets/img/text-about-2.svg'
import spText3 from '@/assets/img/text-about-3.svg'
import spText4 from '@/assets/img/text-about-4.svg'
import spText5 from '@/assets/img/text-about-5.svg'
import spText6 from '@/assets/img/text-about-6.svg'
import spText7 from '@/assets/img/text-about-7.svg'
import spText8 from '@/assets/img/text-about-8.svg'
import spText9 from '@/assets/img/text-about-9.svg'
import spText10 from '@/assets/img/text-about-10.svg'
import spText11 from '@/assets/img/text-about-11.svg'
import spText12 from '@/assets/img/text-about-12.svg'
import spText13 from '@/assets/img/text-about-13.svg'
import spText14 from '@/assets/img/text-about-14.svg'
import spText15 from '@/assets/img/text-about-15.svg'
import spText16 from '@/assets/img/text-about-16.svg'
import spText17 from '@/assets/img/text-about-17.svg'
import spText18 from '@/assets/img/text-about-18.svg'
// PC
import pcText1 from '@/assets/img/text-about-1_pc.svg'
import pcText2 from '@/assets/img/text-about-2_pc.svg'
import pcText3 from '@/assets/img/text-about-3_pc.svg'
import pcText4 from '@/assets/img/text-about-4_pc.svg'
import pcText5 from '@/assets/img/text-about-5_pc.svg'
import pcText6 from '@/assets/img/text-about-6_pc.svg'
import pcText7 from '@/assets/img/text-about-7_pc.svg'
import pcText8 from '@/assets/img/text-about-8_pc.svg'
import pcText9 from '@/assets/img/text-about-9_pc.svg'
import pcText10 from '@/assets/img/text-about-10_pc.svg'
import pcText11 from '@/assets/img/text-about-11_pc.svg'
import pcText12 from '@/assets/img/text-about-12_pc.svg'
import pcText13 from '@/assets/img/text-about-13_pc.svg'
import pcText14 from '@/assets/img/text-about-14_pc.svg'
import pcText15 from '@/assets/img/text-about-15_pc.svg'
import pcText16 from '@/assets/img/text-about-16_pc.svg'

export default {
  name: 'PTopAbout',
  components: {
    CContentHeading
  },
  data: () => ({
    hAbout,
    hAboutPc,
    textData: {
      pc: [
        {
          src: pcText1,
          alt: '「OOKINAWA(おおきなわ)」は'
        },
        {
          src: pcText2,
          alt: '沖縄でもっとも共創性がある'
        },
        {
          src: pcText3,
          alt: 'クリエイティブ集団を目指しています。'
        },
        {
          src: pcText4,
          alt: 'それは、自らアウトプットし'
        },
        {
          src: pcText5,
          alt: '知識や経験をシェアし'
        },
        {
          src: pcText6,
          alt: '新しい可能性にジョインし'
        },
        {
          src: pcText7,
          alt: 'リトライし続けること。'
        },
        {
          src: pcText8,
          alt: '沖縄をプロデュースする人が生まれ'
        },
        {
          src: pcText9,
          alt: '増えていくような場になり'
        },
        {
          src: pcText10,
          alt: 'そして、新しい価値を創造する集団になること。'
        },
        {
          src: pcText11,
          alt: 'これまでの価値観にとらわれず'
        },
        {
          src: pcText12,
          alt: '領域を超えて集まる人の想いと'
        },
        {
          src: pcText13,
          alt: 'アイデアの重なりが'
        },
        {
          src: pcText14,
          alt: 'やがて大きな力と、うねりにとなって'
        },
        {
          src: pcText15,
          alt: '次代と豊かな沖縄を創るでしょう。'
        },
        {
          src: pcText16,
          alt: 'これから、OOKINAWAの挑戦がはじまります。'
        }
      ],
      sp: [
        {
          src: spText1,
          alt: '「OOKINAWA(おおきなわ)」は'
        },
        {
          src: spText2,
          alt: '沖縄でもっとも共創性がある'
        },
        {
          src: spText3,
          alt: 'クリエイティブ集団を目指しています。'
        },
        {
          src: spText4,
          alt: 'それは、自らアウトプットし'
        },
        {
          src: spText5,
          alt: '知識や経験をシェアし'
        },
        {
          src: spText6,
          alt: '新しい可能性にジョインし'
        },
        {
          src: spText7,
          alt: 'リトライし続けること。'
        },
        {
          src: spText8,
          alt: '沖縄をプロデュースする人が生まれ'
        },
        {
          src: spText9,
          alt: '増えていくような場になり'
        },
        {
          src: spText10,
          alt: 'そして、新しい価値を'
        },
        {
          src: spText11,
          alt: '創造する集団になること。'
        },
        {
          src: spText12,
          alt: 'これまでの価値観にとらわれず'
        },
        {
          src: spText13,
          alt: '領域を超えて集まる人の想いと'
        },
        {
          src: spText14,
          alt: 'アイデアの重なりが'
        },
        {
          src: spText15,
          alt: 'やがて大きな力と、うねりにとなって'
        },
        {
          src: spText16,
          alt: '次代と豊かな沖縄を創るでしょう。'
        },
        {
          src: spText17,
          alt: 'これから、OOKINAWAの'
        },
        {
          src: spText18,
          alt: '挑戦がはじまります。'
        }
      ]
    },
    refs: new Map(),
    trigger: null,
    isDesktop: null,
    isReset: false,
    vars: {
      y: 0,
      wh: 0,
      prev: 0
    }
  }),
  computed: {
    ...mapGetters('media-query', ['device'])
  },
  watch: {
    async device (matches) {
      this.isDesktop = matches
      await this.setItems()

      if (this.trigger && this.trigger.isReady) {
        this.trigger.dispose()
        this.trigger.refs = this.refs
        this.trigger.init()
      }
    }
  },
  async mounted () {
    this.isDesktop = window.innerWidth > this.sw - 1
    await this.setItems()
    this.trigger = new ScrollTrigger({ refs: this.refs, once: false, delay: 0 })
    this.trigger.init()
    resizer.add(this.onResize)
    this.onResize()
    emitter.on(EVENTS.RENDER, this.onScroll)
  },
  methods: {
    async setItems () {
      await this.$nextTick()
      this.refs.set('target', this.$refs.container)
      this.refs.set('item', this.$refs.text)
    },
    onScroll ({ current }) {
      if (current > this.vars.y - this.vars.wh) {
        this.isReset = false
      } else if (current < this.vars.prev && !this.isReset) {
        this.isReset = true
        this.trigger.reset()
      }
      this.vars.prev = current
    },
    onResize (width, height = window.innerHeight) {
      const target = this.refs.get('target')
      this.vars.y = getOffset(target).top
      this.vars.wh = height
    }
  }
}
</script>

<style lang="scss" scoped>
.p-top-about {
  position: relative;
  padding-bottom: _vw(140, $size-sp);

  @include media(pc) {
    padding-bottom: _vw(180, $size-sp);
  }

  @include e(inner) {
    @include media(pc) {
      padding: 0 0 0 _vw(250, $size-pc);
    }
  }

  @include e(container) {
    padding: _vw(80, $size-sp) 0 0 _vw(144, $size-sp);

    @include media(pc) {
      padding: _vw(80, $size-pc) 0 0 _vw(330, $size-pc);
    }
  }

  @include e(text) {
    margin-top: _vw(64, $size-sp);

    img {
      opacity: 0;
      transform: translateY(100px);
      transition: opacity 0.1s, transform 1.8s $ease-out-cubic;

      @include media(pc) {
        transform: translateY(600%);
      }
    }

    &.is-intersect {
      img {
        opacity: 1;
        transform: translateY(0px);
      }
    }

    &:first-child {
      margin-top: 0;
    }

    @include media(pc) {
      margin-top: _vw(76, $size-pc);
    }

    @include m(1) {
      width: _vw(425, $size-sp);

      @include media(pc) {
        width: _vw(700, $size-pc);
        max-width: 700px;
      }
    }

    @include m(2) {
      width: _vw(427, $size-sp);

      @include media(pc) {
        width: _vw(695, $size-pc);
        max-width: 695px;
      }
    }

    @include m(3) {
      width: _vw(564, $size-sp);

      @include media(pc) {
        width: _vw(909, $size-pc);
        max-width: 909px;
      }
    }

    @include m(4) {
      width: _vw(385, $size-sp);

      @include media(pc) {
        width: _vw(623, $size-pc);
        max-width: 623px;
      }
    }

    @include m(5) {
      width: _vw(330, $size-sp);

      @include media(pc) {
        width: _vw(534, $size-pc);
        max-width: 534px;
      }
    }

    @include m(6) {
      width: _vw(393, $size-sp);

      @include media(pc) {
        width: _vw(635, $size-pc);
        max-width: 635px;
      }
    }

    @include m(7) {
      width: _vw(338, $size-sp);

      @include media(pc) {
        width: _vw(535, $size-pc);
        max-width: 535px;
      }
    }

    @include m(8) {
      width: _vw(520, $size-sp);

      @include media(pc) {
        width: _vw(838, $size-pc);
        max-width: 838px;
      }
    }

    @include m(9) {
      width: _vw(386, $size-sp);

      @include media(pc) {
        width: _vw(625, $size-pc);
        max-width: 625px;
      }
    }

    @include m(10) {
      width: _vw(323, $size-sp);

      @include media(pc) {
        width: _vw(1108, $size-pc);
        max-width: 1108px;
      }
    }

    @include m(11) {
      width: _vw(375, $size-sp);

      @include media(pc) {
        width: _vw(745, $size-pc);
        max-width: 745px;
      }
    }

    @include m(12) {
      width: _vw(461, $size-sp);

      @include media(pc) {
        width: _vw(735, $size-pc);
        max-width: 735px;
      }
    }

    @include m(13) {
      width: _vw(456, $size-sp);

      @include media(pc) {
        width: _vw(473, $size-pc);
        max-width: 473px;
      }
    }

    @include m(14) {
      width: _vw(293, $size-sp);

      @include media(pc) {
        width: _vw(840, $size-pc);
        max-width: 840px;
      }
    }

    @include m(15) {
      width: _vw(518, $size-sp);

      @include media(pc) {
        width: _vw(815, $size-pc);
        max-width: 815px;
      }
    }

    @include m(16) {
      width: _vw(506, $size-sp);

      @include media(pc) {
        width: _vw(1072, $size-pc);
        max-width: 1072px;
      }
    }

    @include m(17) {
      width: _vw(360, $size-sp);
    }

    @include m(18) {
      width: _vw(302, $size-sp);
    }
  }
}
</style>
