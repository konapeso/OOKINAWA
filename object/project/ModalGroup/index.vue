<template>
  <transition name="fade">
    <component
      :is="modalId"
      v-if="isShow"
    />
  </transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import emitter from '@/helpers/observer/EventEmitter'
import getScrollBarWidth from '@/helpers/getScrollBarWidth'
import delay from '@/helpers/delay'
import { setStyle } from '@/helpers/style'
import ModalShinjo from './ModalShinjo'
import ModalYamashita from './ModalYamashita'
import ModalKuda from './ModalKuda'
import ModalAkamine from './ModalAkamine'

export const EVENTS = {
  OPEN: 'modal:open',
  CLOSE: 'moda:close'
}

export default {
  name: 'ModalGroup',
  components: {
    ModalShinjo,
    ModalYamashita,
    ModalKuda,
    ModalAkamine
  },
  data: () => ({
    barSize: null,
    currentId: null
  }),
  computed: {
    ...mapState('modal', ['modalId']),
    ...mapGetters('modal', ['id']),
    isShow () {
      return this.modalId !== ''
    }
  },
  watch: {
    async id (modalId) {
      if (modalId !== '') {
        await this.$nextTick()
        this.body.classList.add(...['is-locked', 'is-modal-opened'])
        setStyle(this.body, { paddingRight: `${this.barSize}px` })
        this.currentId = modalId
        emitter.emit(EVENTS.OPEN, this.currentId)
      } else {
        await delay(350)
        emitter.emit(EVENTS.CLOSE, this.currentId)
        setStyle(this.body, { paddingRight: '' })
        this.body.classList.remove(...['is-locked', 'is-modal-opened'])
      }
    }
  },
  mounted () {
    this.barSize = getScrollBarWidth()
  }
}
</script>
