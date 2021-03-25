<template>
  <div
    :class="className"
    class="c-slide-controls"
  >
    <button
      class="c-slide-controls__btn c-slide-controls__btn--prev"
      @click="onClickPrev"
    >
      <c-arrow class="c-arrow--flipX" />
    </button>
    <span class="c-slide-controls__label">
      <img
        src="@/assets/img/scroll.svg"
        alt="SCROLL"
      >
    </span>
    <button
      class="c-slide-controls__btn c-slide-controls__btn--next"
      @click="onClickNext"
    >
      <c-arrow />
    </button>
  </div>
</template>

<script>
import CArrow from '@/object/component/CArrow'

export default {
  name: 'CSlideControls',
  components: {
    CArrow
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClickPrev () {
      this.$emit('prev')
    },
    onClickNext () {
      this.$emit('next')
    }
  }
}
</script>

<style lang="scss">
.c-slide-controls {
  position: relative;
  @include center-flex();
  margin-top: 54px;
  z-index: 1;

  @include media(pc) {
    margin: 44px 0;
  }

  @include e(label) {
    width: _vw(118, $size-sp);
    margin: 0 12px;
    line-height: 1;

    @include media(pc) {
      width: _vw(85, $size-pc);
      max-width: 85px;
      min-width: 70px;
    }
  }

  @include e(btn) {
    position: relative;
    width: _vw(87, $size-sp);

    .c-arrow__picture {
      transition: transform 0.3s $ease-out-cubic;
    }

    @include media(pc) {
      &:hover {
        .c-arrow__picture {
          transform: translate(8px, 0);
        }
      }
    }
  }
}
</style>
