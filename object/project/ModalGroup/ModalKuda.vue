<template>
  <base-modal :items="items">
    <template slot="header">
      <div class="p-modal__arrows">
        <button
          class="p-modal__btn p-modal__btn--prev"
          data-gtag-label="ModalShinjo"
          @click="show('ModalShinjo')"
        >
          <c-arrow class="c-arrow--flipX" />
          <span class="p-modal__label u-block-pc">
            <img
              src="@/assets/img/text-back.svg"
              alt="BACK"
            >
          </span>
        </button>
        <button
          class="p-modal__btn p-modal__btn--next"
          data-gtag-label="ModalAkamine"
          @click="show('ModalAkamine')"
        >
          <span class="p-modal__label u-block-pc">
            <img
              src="@/assets/img/text-next.svg"
              alt="NEXT"
            >
          </span>
          <c-arrow />
        </button>
      </div>
      <button
        v-magnet-mouse="{perspective: 0}"
        class="p-modal__close"
        @click="hide"
      />
    </template>
  </base-modal>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import CArrow from '@/object/component/CArrow'
import bgKuda from '@/assets/img/bg-modal-kuda.svg'
import bgKudaPc from '@/assets/img/bg-modal-kuda_pc.svg'
import imgKuda from '@/assets/img/img-modal-kuda.png'
import imgKudaPc from '@/assets/img/img-modal-kuda_pc.png'
import BaseModal from './BaseModal'

export default {
  name: 'ModalKuda',
  components: {
    BaseModal,
    CArrow
  },
  data: () => ({
    items: {
      fb: 'https://www.facebook.com/yuta.kuda',
      tw: 'https://twitter.com/qootaqoota',
      name: '久田 友太',
      en: 'kuda',
      position: 'GYOKU 代表取締役 Art Director<br>GUILD OKINAWA 取締役 Art Director<br>ocy<small class="u-font-small-sp">（沖縄クリエイターズ結い）</small>会長<br>OOKINAWA 会長',
      text: '1982年 沖縄県 具志川 生まれ<br>県内の広告代理店で、延べ17年間勤める。<br>2015年より、ocy（沖縄クリエイターズ結い）<br class="u-block-sp">会長に就任。<br class="u-block-pc">3人の仲間と共に、<br class="u-block-sp">GUILD OKINAWAを設立。<br>2019年4月に、<br class="u-block-sp">株式会社GYOKUを、<br class="u-block-sp">PARTY、<br class="u-block-pc">GUILD OKINAWAと<br class="u-block-sp">共に設立。県外のWEB広告や、<br>県内企業〜個人のデザイン・<br class="u-block-sp">ブランディング・<br class="u-block-pc">創業の支援などに<br class="u-block-sp">携わる。',
      bg: {
        src: bgKuda,
        srcset: bgKudaPc,
        alt: 'YUTA KUDA'
      },
      thumb: {
        src: imgKuda,
        srcset: imgKudaPc
      }
    }
  }),
  methods: {
    ...mapMutations('modal', ['hide']),
    ...mapActions('modal', ['show'])
  }
}
</script>
