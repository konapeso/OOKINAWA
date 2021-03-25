<template>
  <p-modal>
    <div
      v-if="hasHeaderSlot"
      class="p-modal__head"
    >
      <slot name="header" />
      <dl class="p-modal__contact">
        <dt class="p-modal__contact-dt">
          <img
            src="@/assets/img/text-contact.svg"
            alt="CONTACT"
          >
        </dt>
        <dd class="p-modal__contact-dd">
          <a
            v-if="items.fb"
            v-magnet-mouse="{ perspective: 0 }"
            :href="items.fb"
            rel="noopener"
            target="_blank"
            class="p-modal__share-link p-modal__share-link--fb"
            :data-gtag-label="gtagSNS('facebook')"
          >
            <svg-icon
              name="facebook"
              title="facebook"
              width="72"
              height="77"
              class="p-modal__share-svg"
            />
          </a>
          <a
            v-if="items.tw"
            v-magnet-mouse="{ perspective: 0 }"
            :href="items.tw"
            rel="noopener"
            target="_blank"
            class="p-modal__share-link p-modal__share-link--tw"
            :data-gtag-label="gtagSNS()"
          >
            <svg-icon
              name="twitter"
              title="twitter"
              width="73"
              height="63"
              class="p-modal__share-svg"
            />
          </a>
        </dd>
      </dl>
    </div>
    <div class="p-modal__body">
      <div
        v-if="items.bg"
        class="p-modal__bg-name"
        :class="`p-modal__bg-name--${items.en}`"
      >
        <c-picture
          :src="items.bg.src"
          :srcset="items.bg.srcset"
          :alt="items.bg.alt"
        />
      </div>
      <p class="p-modal__name">
        {{ items.name }}
      </p>
      <!-- eslint-disable vue/no-v-html -->
      <p
        class="p-modal__position"
        v-html="$sanitize(items.position)"
      />
      <p
        class="p-modal__text"
        :class="`p-modal__text--${items.en}`"
        v-html="$sanitize(items.text)"
      />
      <!--eslint-enable-->
    </div>
    <div
      v-if="items.thumb"
      class="p-modal__foot"
    >
      <c-picture
        ref="text"
        :src="items.thumb.src"
        :srcset="items.thumb.srcset"
        :class="`p-modal__thumb--${items.en}`"
        class-name="p-modal__thumb"
        alt=""
      />
    </div>
  </p-modal>
</template>

<script>
import { capitalize } from '@/helpers/string'
import CPicture from '@/object/component/CPicture'
import PModal from '../PModal'

export default {
  name: 'BaseModal',
  components: {
    PModal,
    CPicture
  },
  props: {
    items: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasHeaderSlot () {
      return !!this.$slots.header
    }
  },
  methods: {
    gtagSNS (app = 'twitter') {
      return `${capitalize(this.items.en)}_${app}`
    }
  }
}
</script>
