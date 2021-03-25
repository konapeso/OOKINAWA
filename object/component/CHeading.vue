<template>
  <component
    :is="tag"
    :class="className"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CHeading',
  props: {
    level: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: null
    }
  },
  computed: {
    tag () {
      return `h${this.level}`
    }
  }
}
</script>
