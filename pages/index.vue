<template>
  <div class="l-content">
    <p-top-mv />
    <p-scroll>
      <l-main>
        <p-top-about />
        <p-top-character />
        <p-top-output />
        <p-top-connect />
      </l-main>
      <l-footer />
    </p-scroll>
    <modal-group />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LMain from '@/layout/LMain'
import LFooter from '@/layout/LFooter'
import PScroll from '@/object/project/PScroll'
import PTopMv from '@/object/project/PTopMv'
import PTopAbout from '@/object/project/PTopAbout'
import PTopCharacter from '@/object/project/PTopCharacter'
import PTopOutput from '@/object/project/PTopOutput'
import PTopConnect from '@/object/project/PTopConnect'
import ModalGroup from '@/object/project/ModalGroup/index'
import ImagesLoaded from '@/helpers/ImagesLoaded'

export default {
  components: {
    LMain,
    LFooter,
    PScroll,
    PTopMv,
    PTopAbout,
    PTopCharacter,
    PTopOutput,
    PTopConnect,
    ModalGroup
  },
  computed: {
    ...mapGetters('loading', ['activated'])
  },
  async mounted () {
    await ImagesLoaded.load(this.$el)
    this.$store.commit('loading/loaded')
  }
}
</script>
