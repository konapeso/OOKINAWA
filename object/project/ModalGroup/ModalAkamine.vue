<template>
  <base-modal :items="items">
    <template slot="header">
      <div class="p-modal__arrows">
        <button
          class="p-modal__btn p-modal__btn--prev"
          data-gtag-label="ModalKuda"
          @click="show('ModalKuda')"
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
          data-gtag-label="ModalYamashita"
          @click="show('ModalYamashita')"
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
import bgAkamine from '@/assets/img/bg-modal-akamine.svg'
import bgAkaminePc from '@/assets/img/bg-modal-akamine_pc.svg'
import imgAkamine from '@/assets/img/img-modal-akamine.png'
import imgAkaminePc from '@/assets/img/img-modal-akamine_pc.png'
import BaseModal from './BaseModal'

export default {
  name: 'ModalAkamine',
  components: {
    BaseModal,
    CArrow
  },
  data: () => ({
    items: {
      fb: 'https://www.facebook.com/akaichi234',
      tw: 'https://twitter.com/akaichi2345',
      name: '赤嶺 謙一郎',
      en: 'akamine',
      position: 'NO MARK Inc. 代表取締役 <br>OOKINAWA 副会長',
      text: '「沖縄の魅力を世界に伝える」というビジョンを掲げ<br class="u-block-pc">2018年にNO MARK Inc.を設立。県内各地の魅力発信に貢献すべく、<br>エンジニア、旅行代理店や広告代理店経験を活かして<br class="u-block-pc">企画提案からWebプロモーションを一環して行う。',
      bg: {
        src: bgAkamine,
        srcset: bgAkaminePc,
        alt: 'KENICHIRO AKAMINE'
      },
      thumb: {
        src: imgAkamine,
        srcset: imgAkaminePc
      }
    }
  }),
  methods: {
    ...mapMutations('modal', ['hide']),
    ...mapActions('modal', ['show'])
  }
}
</script>
