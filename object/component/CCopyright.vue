<template>
  <p
    :class="{ 'c-copyright--header': !isFooter, 'u-block-pc': !isFooter }"
    class="c-copyright"
  >
    <img
      v-if="isFooter"
      src="@/assets/img/copyright.svg"
      alt="COPYRIGHT © 2020 OOKINAWA ALLRIGHTS RESERVED."
    >
    <img
      v-else
      src="@/assets/img/header-copy.svg"
      alt="COPYRIGHT © 2020 OOKINAWA ALLRIGHTS RESERVED."
    >
  </p>
</template>

<script>
export default {
  name: 'CCopyright',
  props: {
    isFooter: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.c-copyright {
  @include center(_vw(660, $size-sp));
  max-width: _half-px(660);

  @include media(pc) {
    @include center(386);
    max-width: initial;

    @include m(header) {
      @include position(absolute, $bottom: 16px, $left: 50%);
      width: 34px;
      margin-left: -17px;
    }
  }
}
</style>
