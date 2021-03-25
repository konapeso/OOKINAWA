<template>
  <button
    v-magnet-mouse="{perspective: 0}"
    class="c-btn-menu"
    data-gtag-label="top_menu"
    @click="onClick"
  >
    <span class="c-btn-menu__inner">
      <span
        v-for="i in 3"
        :key="i"
        class="c-btn-menu__line"
      />
    </span>
  </button>
</template>

<script>
export default {
  name: 'CBtnMenu',
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.c-btn-menu {
  @include position(absolute, $top: 0, $right: 0);
  @include size(50);

  $selector: &;

  @include media(pc) {
    top: 5%;
    @include size(100%, 80);
    max-width: 130px;
    margin-top: -40px;

    &:hover {
      #{$selector}__line {
        &:nth-child(1) {
          margin-left: -16px;
        }

        &:nth-child(3) {
          margin-left: 16px;
        }
      }
    }
  }

  @include e(inner) {
    @include media(pc) {
      display: flex;
      transform: rotate(90deg);
      @include size(100%);
    }
  }

  @include e(line) {
    @include center-translate();
    @include size(_half-px(42), 2);
    background-color: $color-gray;
    transition: all 0.35s $ease-out-sine;
    pointer-events: none;

    &:nth-child(1) {
      margin-top: -8px;

      .is-animating & {
        margin-top: 0;
        transform: rotate(-45deg) translate(-50%, -50%);
        transform-origin: 0% 0%;

        @include media(pc) {
          margin-left: 0 !important;
        }
      }
    }

    &:nth-child(2) {
      .is-animating & {
        width: 0;
      }
    }

    &:nth-child(3) {
      margin-top: 8px;

      .is-animating & {
        margin-top: 0;
        transform: rotate(45deg) translate(-50%, -50%);
        transform-origin: 0% 0%;

        @include media(pc) {
          margin-left: 0 !important;
        }
      }
    }

    @include media(pc) {
      @include size(4, 40);

      &:nth-child(1) {
        margin: 0 0 0 -14px;
      }

      &:nth-child(3) {
        margin: 0 0 0 14px;
      }
    }
  }
}
</style>
