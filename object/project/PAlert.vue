<template>
  <div
    v-if="isDisplay"
    class="p-alert"
  >
    <div class="p-alert__inner">
      <c-heading
        :level="2"
        class-name="p-alert__heading"
      >
        サポートブラウザ
      </c-heading>
      <p class="p-alert__text">
        当サイトでは最新のWebブラウザをサポートするよう設計されています。<br>
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener"
        >Chrome</a>、<a
          href="http://www.mozilla.org/firefox/"
          target="_blank"
          rel="noopener"
        >Firefox</a>、<a
          href="http://www.apple.com/safari/"
          target="_blank"
          rel="noopener"
        >Safari</a>の推奨ブラウザをご利用ください。
      </p>
    </div>
  </div>
</template>

<script>
import CHeading from '@/object/component/CHeading'

export default {
  name: 'PAlert',
  components: {
    CHeading
  },
  props: {
    isDisplay: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.p-alert {
  @include center-flex();
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%);
  background-color: white;
  z-index: 99;

  @include e(inner) {
    padding: 30px;
    letter-spacing: 0.03em;
  }

  @include e(heading) {
    @include font-rem(28);
    margin: 0 0 10px;
  }

  @include e(text) {
    @include font-rem(15);
    @include line-height(32, 14);

    a {
      color: inherit;
    }
  }
}
</style>
