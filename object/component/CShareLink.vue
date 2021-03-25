<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'CShareLink',
  props: {
    sns: {
      type: String,
      default: 'twitter'
    },
    ogUrl: {
      type: String,
      default: 'https://ookinawa.world/'
    },
    text: {
      type: String,
      default: '沖縄を豊かにするクリエイティブサークル #OOKINAWA'
    }
  },
  computed: {
    href () {
      return this.sns === 'twitter' ? this.twitter : this.facebook
    },
    facebook () {
      return `http://www.facebook.com/sharer.php?u=${this.ogUrl}`
    },
    twitter () {
      return `http://twitter.com/share?url=${this.ogUrl}&text=${this.encode(this.text)}`
    }
  },
  methods: {
    encode (strURL) {
      return encodeURIComponent(strURL).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
    }
  }
}
</script>
