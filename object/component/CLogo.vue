<template>
  <div class="c-logo">
    <img
      class="c-logo__img"
      src="@/assets/img/logo.svg"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'CLogo'
}
</script>

<style lang="scss">
.c-logo {
  @include center(_half-px(70));

  @include media(pc) {
    @include center(_vw(88, $size-pc));
    position: absolute;
    bottom: 0;
    max-width: 88px;
    min-width: 48px;
    margin-bottom: 18px;
    margin-left: 18%;
  }
}
</style>
