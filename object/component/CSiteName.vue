<template>
  <div class="c-site-name u-block-sp">
    <svg-icon
      name="site-name"
      title="OOKINAWA"
      class="c-site-name__svg"
    />
  </div>
</template>

<script>
export default {
  name: 'CSiteName'
}
</script>

<style lang="scss">
.c-site-name {
  @include position(absolute, $top: 15px, $left: 15px);
  transition: opacity 0.5s ease;

  .is-menu-opened & {
    opacity: 0;
  }

  @include e(svg) {
    @include size(_half-px(162), _half-px(22));
  }
}
</style>
