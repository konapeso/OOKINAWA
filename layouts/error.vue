<template>
  <transition
    v-if="isShow"
    name="fade"
  >
    <div class="p-error">
      <div class="p-error__inner">
        <h2 class="p-error__heading">
          {{ error.statusCode }} NOT FOUND
        </h2>
        <p class="p-error__text">
          お探しのページは見つかりませんでした。<br>
          リクエストいただいたページは<br>
          削除されたかURLが変更された可能性があります。
        </p>
        <div class="p-error__link">
          <n-link to="/">
            TOPページヘ戻る
          </n-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isShow: false
  }),
  mounted () {
    this.html.classList.add('is-floating')
    setTimeout(() => {
      this.isShow = true
    }, 2400)
  }
}
</script>

<style lang="scss" scoped>
.p-error {
  @include center-flex();
  position: relative;
  @include size(100%, 100vh);
  z-index: 2;

  @include e(heading) {
    @include font-rem(30);
    margin: 0 0 10px;
  }

  @include e(text) {
    @include font-rem(15);
    @include line-height(32, 14);

    a {
      color: inherit;
    }
  }

  @include e(link) {
    margin-top: 20px;
    @include font-rem(15);
    a {
      color: inherit;
    }
  }
}
</style>
