<template>
  <base-modal :items="items">
    <template slot="header">
      <div class="p-modal__arrows">
        <button
          class="p-modal__btn p-modal__btn--prev"
          data-gtag-label="ModalYamashita"
          @click="show('ModalYamashita')"
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
          data-gtag-label="ModalKuda"
          @click="show('ModalKuda')"
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
        class="p-modal__close"
        @click="hide"
      />
    </template>
  </base-modal>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import CArrow from '@/object/component/CArrow'
import bgShinjo from '@/assets/img/bg-modal-shinjo.svg'
import imgShinjo from '@/assets/img/img-modal-shinjo.png'
import imgShinjoPc from '@/assets/img/img-modal-shinjo_pc.png'
import BaseModal from './BaseModal'

export default {
  name: 'ModalShinjo',
  components: {
    BaseModal,
    CArrow
  },
  data: () => ({
    items: {
      fb: 'https://www.facebook.com/naomi.shinjo',
      name: '新城 巨望',
      en: 'shinjo',
      position: '株式会社D2C dot 沖縄オフィス/<br class="u-block-sp">Manager <br> OOKINAWA 専務理事',
      text: '1974年　沖縄県宮古島市生まれ<br>約14年のアパレル会社での経験をへてWeb業界へ<br>国産CMS販売メーカー、Web制作会社、<br>フリーランスを経て2018年10月<br>D2Cdot沖縄オフィス立ち上げ<br>沖縄県広報課SNSプロモーション事業、<br>クリエイター教育事業などに携わる',
      bg: {
        src: bgShinjo,
        srcset: bgShinjo,
        alt: 'NAOMI SHINJO'
      },
      thumb: {
        src: imgShinjo,
        srcset: imgShinjoPc
      }
    }
  }),
  methods: {
    ...mapMutations('modal', ['hide']),
    ...mapActions('modal', ['show'])
  }
}
</script>
