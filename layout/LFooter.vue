<template>
  <footer class="l-footer u-before-modal-opened">
    <c-copyright />
  </footer>
</template>

<script>
import CCopyright from '@/object/component/CCopyright'

export default {
  name: 'LFooter',
  components: {
    CCopyright
  }
}
</script>

<style lang="scss">
.l-footer {
  padding: 20px 0;
  line-height: 1;

  @include media(pc) {
    width: calc(100% - #{_vw(138, $size-pc)});
    width: calc(100% - var(--hw));
    padding: 20px 0 50px;
  }
}
</style>
