<template>
  <picture :class="className">
    <source
      :srcset="srcset"
      :media="media"
    >
    <img
      :src="src"
      :alt="alt"
    >
  </picture>
</template>

<script>
export default {
  name: 'CPicture',
  props: {
    src: {
      type: String,
      required: true
    },
    srcset: {
      type: String,
      required: true
    },
    media: {
      type: String,
      default: '(min-width: 768px)'
    },
    alt: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'c-picture'
    }
  }
}
</script>

<style lang="scss">
.c-picture {
  margin: 0;
}
</style>
