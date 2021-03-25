<template>
  <main id="top_menu" class="l-main">
    <slot />
  </main>
</template>

<script>
export default {
  name: 'LMain'
}
</script>

<style lang="scss">
.l-main {
  overflow: hidden;
  padding-top: 100vh;

  @include pseudo(before) {
    display: block;
    @include size(100%, _vw(400, $size-sp));

    @include media(pc) {
      height: _vw(700, $size-pc);
    }
  }

  @include media(pc) {
    width: calc(100% - #{_vw(138, $size-pc)});
    width: calc(100% - var(--hw));
  }
}
</style>
