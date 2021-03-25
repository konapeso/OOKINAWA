<template>
  <base-modal :items="items">
    <template slot="header">
      <div class="p-modal__arrows">
        <button
          class="p-modal__btn p-modal__btn--prev"
          data-gtag-label="ModalAkamine"
          @click="show('ModalAkamine')"
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
          data-gtag-label="ModalShinjo"
          @click="show('ModalShinjo')"
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
import bgYamashita from '@/assets/img/bg-modal-yamashita.svg'
import bgYamashitaPc from '@/assets/img/bg-modal-yamashita_pc.svg'
import imgYamashita from '@/assets/img/img-modal-yamashita.png'
import imgYamashitaPc from '@/assets/img/img-modal-yamashita_pc.png'
import BaseModal from './BaseModal'

export default {
  name: 'ModalYamashita',
  components: {
    BaseModal,
    CArrow
  },
  data: () => ({
    items: {
      fb: 'https://www.facebook.com/chuck.yamashita',
      name: '山下 紘史',
      en: 'yamashita',
      position: '株式会社D2C dot 取締役　<br> OOKINAWA エヴァンジェリスト',
      text: '現時点で9社を経験、大手小売業、<br class="u-block-sp">インターネット関連、独立、<br>広告代理店など業態業種に囚われない生き方。<br>インターネット黎明期からあらゆる<br class="u-block-sp">ネットビジネスを経験し、<br class="u-block-pc">29歳で突如上京。<br class="u-block-sp">東京では様々な人脈を形成し<br>「やってやれない仕事は無い、<br>なぜなら周りにプロフェッショナルが<br class="u-block-sp">いるから」を発信しつつ、<br>過去には<br class="u-block-sp">メディアミーティング<br class="u-block-sp">というイベントを<br>主催しつづけ毎回100名以上を<br class="u-block-sp">個人で集めビジネスを創出している。<br>『誰とやるか、何をやるか、<br class="u-block-sp">今を生きているか』を<br>信念に活動を続けている<br class="u-block-sp">自由形サラリーマン。',
      bg: {
        src: bgYamashita,
        srcset: bgYamashitaPc,
        alt: 'HIROFUMI YAMASHITA'
      },
      thumb: {
        src: imgYamashita,
        srcset: imgYamashitaPc
      }
    }
  }),
  methods: {
    ...mapMutations('modal', ['hide']),
    ...mapActions('modal', ['show'])
  }
}
</script>
