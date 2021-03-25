<template>
  <section
    id="connect"
    class="p-top-connect"
  >
    <div class="p-top-connect__inner">
      <c-content-heading
        :src="hConnect"
        alt="つながる"
        class-name="c-content-heading--connect"
      />
      <!-- desktop -->
      <div
        v-if="isDesktop"
        ref="container"
        class="p-top-connect__container"
      >
        <p
          v-for="(text, i) in textData.pc"
          ref="text"
          :key="text.index"
          :class="[`p-top-connect__text--${i + 1}`]"
          class="p-top-connect__text"
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
        class="p-top-connect__container"
      >
        <p
          v-for="(text, i) in textData.sp"
          ref="text"
          :key="text.index"
          :class="[`p-top-connect__text--${i + 1}`]"
          class="p-top-connect__text"
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
import hConnect from '@/assets/img/h-connect_pc.svg'
// SP
import spText1 from '@/assets/img/text-connect-1.svg'
import spText2 from '@/assets/img/text-connect-2.svg'
import spText3 from '@/assets/img/text-connect-3.svg'
import spText4 from '@/assets/img/text-connect-4.svg'
import spText5 from '@/assets/img/text-connect-5.svg'
import spText6 from '@/assets/img/text-connect-6.svg'
import spText7 from '@/assets/img/text-connect-7.svg'
import spText8 from '@/assets/img/text-connect-8.svg'
import spText9 from '@/assets/img/text-connect-9.svg'
// PC
import pcText1 from '@/assets/img/text-connect-2_pc.svg'
import pcText2 from '@/assets/img/text-connect-3_pc.svg'
import pcText3 from '@/assets/img/text-connect-4_pc.svg'
import pcText4 from '@/assets/img/text-connect-5_pc.svg'
import pcText5 from '@/assets/img/text-connect-6_pc.svg'

export default {
  name: 'PTopConnect',
  components: {
    CContentHeading
  },
  data: () => ({
    hConnect,
    textData: {
      pc: [
        {
          src: spText1,
          alt: '入会は、完全紹介制。'
        },
        {
          src: pcText1,
          alt: '入会金はかかりませんが、'
        },
        {
          src: pcText2,
          alt: '発足メンバーの承諾を入会条件にしています。'
        },
        {
          src: pcText3,
          alt: '希望者はOOKINAWAメンバーに'
        },
        {
          src: pcText4,
          alt: 'SNSでコンタクトをください。'
        },
        {
          src: pcText5,
          alt: 'ぜひやりたい事を#OOKINAWAでつぶやいてください。'
        }
      ],
      sp: [
        {
          src: spText1,
          alt: '入会は、完全紹介制。'
        },
        {
          src: spText2,
          alt: '入会金はかかりませんが、'
        },
        {
          src: spText3,
          alt: '発足メンバーの承諾を'
        },
        {
          src: spText4,
          alt: '入会条件にしています。'
        },
        {
          src: spText5,
          alt: '希望者はOOKINAWA'
        },
        {
          src: spText6,
          alt: 'メンバーにSNSでコンタクト'
        },
        {
          src: spText7,
          alt: 'をください。ぜひやりたい事'
        },
        {
          src: spText8,
          alt: 'を#OOKINAWAで'
        },
        {
          src: spText9,
          alt: 'つぶやいてください。'
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
.p-top-connect {
  position: relative;
  padding-bottom: _vw(120, $size-sp);

  @include media(pc) {
    padding-bottom: _vw(113, $size-sp);
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
      margin-top: _vw(64, $size-pc);
    }

    @include m(1) {
      width: _vw(360, $size-sp);

      @include media(pc) {
        width: _vw(394, $size-pc);
        max-width: 394px;
      }
    }

    @include m(2) {
      width: _vw(434, $size-sp);

      @include media(pc) {
        width: _vw(475, $size-pc);
        max-width: 475px;
      }
    }

    @include m(3) {
      width: _vw(384, $size-sp);

      @include media(pc) {
        width: _vw(870, $size-pc);
        max-width: 870px;
      }
    }

    @include m(4) {
      width: _vw(403, $size-sp);

      @include media(pc) {
        width: _vw(638, $size-pc);
        max-width: 638px;
      }
    }

    @include m(5) {
      width: _vw(380, $size-sp);

      @include media(pc) {
        width: _vw(570, $size-pc);
        max-width: 570px;
      }
    }

    @include m(6) {
      width: _vw(504, $size-sp);

      @include media(pc) {
        width: _vw(1110, $size-pc);
        max-width: 1110px;
      }
    }

    @include m(7) {
      width: _vw(502, $size-sp);
    }

    @include m(8) {
      width: _vw(330, $size-sp);
    }

    @include m(9) {
      width: _vw(354, $size-sp);
    }
  }
}
</style>
