<template>
  <c-heading
    :level="2"
    :class-name="className"
    class="c-content-heading"
  >
    <div class="c-content-heading__inner">
      <c-picture
        v-if="src"
        :src="src"
        :srcset="srcset"
        :alt="alt"
        class-name="c-content-heading__picture"
      />
    </div>
  </c-heading>
</template>

<script>
import CHeading from '@/object/component/CHeading'
import CPicture from '@/object/component/CPicture'

export default {
  name: 'CContentHeading',
  components: {
    CHeading,
    CPicture
  },
  props: {
    className: {
      type: String,
      default: null
    },
    src: {
      type: String,
      default: '',
      require: true
    },
    srcset: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style lang="scss">
.c-content-heading {
  @include position(absolute, $top: _vw(18, $size-sp), $left: 1px);
  pointer-events: none;
  z-index: 2;

  @include media(pc) {
    top: 0;
    left: _vw(268, $size-pc);
    width: 100%;
  }

  &.c-content-heading--about {
    top: _vw(80, $size-sp);
    width: _vw(54, $size-sp);

    @include media(pc) {
      top: 0;
      width: 100%;
    }
  }

  &.c-content-heading--character {
    width: _vw(54, $size-sp);

    @include media(pc) {
      top: 0;
      width: 100%;
    }
  }

  &.c-content-heading--output {
    top: _vw(-76, $size-sp);
    width: _vw(57, $size-sp);

    @include media(pc) {
      top: 0;
      width: 100%;
    }
  }

  &.c-content-heading--connect {
    top: _vw(80, $size-sp);
    width: _vw(62, $size-sp);

    @include media(pc) {
      top: 0;
      width: 100%;
    }
  }

  @include e(inner) {
    @include media(pc) {
      // max-width: 1480px;
      // margin: 0 auto;
      // padding: 0 60px;
    }
  }

  @include e(picture) {
    .c-content-heading--about & {
      @include media(pc) {
        width: _vw(83, $size-pc);
        max-width: 83px;
        margin-top: _vw(84, $size-pc);
      }
    }

    .c-content-heading--character & {
      @include media(pc) {
        width: _vw(84, $size-pc);
        max-width: 84px;
        margin-top: _vw(10, $size-pc);
      }
    }

    .c-content-heading--output & {
      @include media(pc) {
        width: _vw(84, $size-pc);
        max-width: 84px;
        margin-top: _vw(158, $size-pc);
      }
    }

    .c-content-heading--connect & {
      @include media(pc) {
        width: _vw(89, $size-pc);
        max-width: 89px;
        margin-top: _vw(80, $size-pc);
      }
    }
  }
}
</style>
