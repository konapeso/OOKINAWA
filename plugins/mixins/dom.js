import Vue from 'vue'

Vue.mixin({
  data: () => ({
    html: null,
    body: null
  }),
  mounted () {
    const doc = document
    this.html = doc.documentElement
    this.body = doc.body
  }
})
