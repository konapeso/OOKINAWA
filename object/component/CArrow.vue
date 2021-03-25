<template>
  <i class="c-arrow">
    <c-picture
      :src="arrowRight"
      :srcset="arrowRightPc"
      class-name="c-arrow__picture"
    />
    <!-- <span class="c-arrow__line c-arrow__line--1" />
    <span class="c-arrow__line c-arrow__line--2" /> -->
  </i>
</template>

<script>
import CPicture from '@/object/component/CPicture'
import arrowRight from '@/assets/img/arrow-right.svg'
import arrowRightPc from '@/assets/img/arrow-right_pc.svg'

export default {
  name: 'CArrow',
  components: {
    CPicture
  },
  data: () => ({
    arrowRight,
    arrowRightPc
  })
}
</script>

<style lang="scss">
.c-arrow {
  display: block;
  position: relative;
  // @include size(44);

  @include media(pc) {
    width: 89px;
  }

  @include m(flipX) {
    transform: scaleX(-1);
    margin-left: auto;
  }

  @include e(line) {
    display: block;
    @include size(37, 1);
    background-color: black;

    @include m(1) {
      @include center-translate();

      @include media(pc) {
        width: 92px;
      }
    }

    @include m(2) {
      right: 3px;
      width: 10px;
      margin-top: -4px;
      @include center-translate(false);
      transform: rotate(45deg);
    }
  }
}
</style>
