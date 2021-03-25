<template>
  <div
    ref="item"
    class="swiper-slide p-top-character__slide-item"
    :class="`p-top-character__slide-item--${item.color}`"
    :data-modal-id="item.modalId"
    :data-gtag-label="item.modalId"
  >
    <div class="p-top-character__slide-img">
      <figure class="p-top-character__slide-figure">
        <img
          :src="item.img.src"
          :alt="item.img.alt"
        >
      </figure>
      <div class="p-top-character__circle-wrap">
        <span class="p-top-character__slide-circle p-top-character__slide-circle--1" />
        <span class="p-top-character__slide-circle p-top-character__slide-circle--2" />
      </div>
      <button class="p-top-character__slide-view">
        <img
          class="p-top-character__text-view"
          src="@/assets/img/text-view.svg"
          alt="VIEW"
        >
      </button>
    </div>
    <div
      class="p-top-character__slide-summary"
      :class="`p-top-character__slide-summary--${item.summary.name}`"
    >
      <p class="p-top-character__slide-ja">
        <img
          :src="item.summary.ja.src"
          :alt="item.summary.ja.alt"
        >
      </p>
      <p class="p-top-character__slide-en">
        <img
          :src="item.summary.en.src"
          :alt="item.summary.en.alt"
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PTopCharacterItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.p-top-character {
  $block: &;

  @include e(slide-item) {
    padding-top: _vw(50, $size-sp);

    @include media(pc) {
      width: _percentage(772, $size-pc);
      max-width: 772px;
      padding: _vw(30, $size-pc) 0;
      cursor: pointer;

      &:hover {
        #{$block}__slide-view {
          &::before {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  @include e(slide-img) {
    position: relative;
    @include center(_vw(617, $size-sp));
    pointer-events: none;

    @include media(pc) {
      width: 100%;
    }
  }

  @include e(slide-figure) {
    @include media(pc) {
      margin-left: 0;
    }
  }

  @include e(circle-wrap) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
    transition: transform 1s;
    transform: scale(1.1);
    z-index: -1;
  }

  @include e(slide-circle) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
    border-radius: 50%;
    border: 1px solid $color-blue;

    @include m(1) {
      animation: rotate1 10s linear infinite;

      .is-character-active & {
        animation-duration: 4s;
      }
    }

    @include m(2) {
      animation: rotate2 11s linear infinite;
      .is-character-active & {
        animation-duration: 5s;
      }
    }

    .p-top-character__slide-item--yellow & {
      border-color: $color-yellow;
    }

    .p-top-character__slide-item--orange & {
      border-color: $color-orange;
    }

    .p-top-character__slide-item--gray & {
      border-color: $color-gray-1;
    }
  }

  @include e(slide-view) {
    @include center-flex();
    @include position(
      absolute,
      $bottom: _vw(-14, $size-sp),
      $right: _vw(-14, $size-sp)
    );
    @include size(_vw(144, $size-sp));
    pointer-events: none;

    @include pseudo(before) {
      @include position(absolute, $top: 0, $left: 0);
      @include size(100%);
      border-radius: 50%;
      background-color: $color-blue;
      transition: transform 0.5s $ease-out-cubic;

      .p-top-character__slide-item--yellow & {
        background-color: $color-yellow;
      }

      .p-top-character__slide-item--orange & {
        background-color: $color-orange;
      }

      .p-top-character__slide-item--gray & {
        background-color: $color-gray-1;
      }
    }

    img {
      position: relative;
      z-index: 1;
    }

    @include media(pc) {
      bottom: _vw(-14, $size-pc);
      right: _vw(-14, $size-pc);
      @include size(_vw(174, $size-pc));
      max-width: 174px;
      max-height: 174px;
    }
  }

  @include e(slide-summary) {
    @include center-flex();
    flex-direction: column;
    margin-top: 58px;

    @include media(pc) {
      align-items: start;
      @include position(
        absolute,
        $top: _percentage(130, 772),
        $left: _percentage(-38, 772)
      );
      margin-top: 0;
    }
  }

  @include e(slide-ja) {
    .p-top-character__slide-summary--shinjo & {
      width: _vw(259, $size-sp);

      @include media(pc) {
        width: _vw(259, $size-pc);
        max-width: 259px;
      }
    }

    .p-top-character__slide-summary--yamashita & {
      width: _vw(250, $size-sp);

      @include media(pc) {
        width: _vw(250, $size-pc);
        max-width: 250px;
      }
    }

    .p-top-character__slide-summary--kuda & {
      width: _vw(253, $size-sp);

      @include media(pc) {
        width: _vw(253, $size-pc);
        max-width: 253px;
      }
    }

    .p-top-character__slide-summary--akamine & {
      width: _vw(315, $size-sp);

      @include media(pc) {
        width: _vw(315, $size-pc);
        max-width: 315px;
      }
    }
  }

  @include e(slide-en) {
    margin-top: 24px;

    @include media(pc) {
      margin-top: _percentage(76, 772);
    }

    .p-top-character__slide-summary--shinjo & {
      width: _vw(252, $size-sp);

      @include media(pc) {
        width: _vw(252, $size-pc);
        max-width: 252px;
      }
    }

    .p-top-character__slide-summary--yamashita & {
      width: _vw(387, $size-sp);

      @include media(pc) {
        width: _vw(387, $size-pc);
        max-width: 387px;
      }
    }

    .p-top-character__slide-summary--kuda & {
      width: _vw(197, $size-sp);

      @include media(pc) {
        width: _vw(197, $size-pc);
        max-width: 197px;
      }
    }

    .p-top-character__slide-summary--akamine & {
      width: _vw(366, $size-sp);

      @include media(pc) {
        width: _vw(366, $size-pc);
        max-width: 366px;
      }
    }
  }

  @include e(text-view) {
    width: _vw(58, $size-sp);

    @include media(pc) {
      width: _vw(70, $size-pc);
      max-width: 70px;
    }
  }
}
</style>
