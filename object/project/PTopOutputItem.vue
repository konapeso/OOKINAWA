<template>
  <div
    ref="item"
    class="swiper-slide p-top-output__slide-item"
    :class="`p-top-output__slide-item--${item.color}`"
  >
    <template v-if="item.href">
      <a
        :href="item.href"
        target="_blank"
        rel="noopener"
        class="p-top-output__link"
        :data-gtag-label="item.gtagLabel"
      >
        <div class="p-top-output__slide-head">
          <div class="p-top-output__slide-meta">
            <span class="p-top-output__slide-cat">
              {{ item.cat }}
            </span>
            <span class="p-top-output__slide-date">
              {{ item.date }}
            </span>
          </div>
          <div class="p-top-output__slide-img">
            <figure class="p-top-output__slide-figure">
              <img
                :src="item.img.src"
                :alt="item.img.alt"
              >
            </figure>
            <div
              class="p-top-output__circle-wrap"
              :class="`p-top-output__circle-wrap--${item.number}`"
            >
              <span class="p-top-output__slide-circle p-top-output__slide-circle--1" />
              <span class="p-top-output__slide-circle p-top-output__slide-circle--2" />
            </div>
          </div>
        </div>
        <div class="p-top-output__slide-body">
          <div class="p-top-output__slide-summary">
            <!-- eslint-disable vue/no-v-html -->
            <h3
              class="p-top-output__slide-heading"
              v-html="$sanitize(item.title)"
            />
            <p
              class="p-top-output__slide-text"
              v-html="$sanitize(item.text)"
            />
            <!--eslint-enable-->
          </div>
        </div>
      </a>
    </template>
    <template v-else>
      <div class="p-top-output__slide-head">
        <div class="p-top-output__slide-meta">
          <span class="p-top-output__slide-cat">
            {{ item.cat }}
          </span>
          <span class="p-top-output__slide-date">
            {{ item.date }}
          </span>
        </div>
        <div class="p-top-output__slide-img">
          <figure class="p-top-output__slide-figure">
            <img
              :src="item.img.src"
              :alt="item.img.alt"
            >
          </figure>
          <div
            class="p-top-output__circle-wrap"
            :class="`p-top-output__circle-wrap--${item.number}`"
          >
            <span class="p-top-output__slide-circle p-top-output__slide-circle--1" />
            <span class="p-top-output__slide-circle p-top-output__slide-circle--2" />
          </div>
        </div>
      </div>
      <div class="p-top-output__slide-body">
        <div class="p-top-output__slide-summary">
          <!-- eslint-disable vue/no-v-html -->
          <h3
            class="p-top-output__slide-heading"
            v-html="$sanitize(item.title)"
          />
          <p
            class="p-top-output__slide-text"
            v-html="$sanitize(item.text)"
          />
          <!--eslint-enable-->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PTopOutputItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data: () => ({
    labelPrefix: 'top_output_'
  })
}
</script>

<style lang="scss" scoped>
.p-top-output {
  $selector: &;

  @include e(link) {
    color: inherit;
    text-decoration: none;

    @include media(pc) {
      &:hover {
        #{$selector}__slide-figure {
          transform: scale(1.12);
        }
      }
    }
  }

  @include e(slide-item) {
    @include media(pc) {
      width: 33.3%;
      padding: _vw(180, $size-pc) 0 _vw(60, $size-pc);
    }
  }

  @include e(slide-head) {
    position: relative;
  }

  @include e(slide-meta) {
    @include position(
      absolute,
      $top: _vw(-66, $size-sp),
      $left: _vw(-10, $size-sp)
    );
    z-index: 2;

    @include media(pc) {
      top: _vw(-10, $size-pc);
      left: _vw(30, $size-pc);
    }
  }

  @include e(slide-cat) {
    padding: 4px 4px 5px 5px;
    @include font-vw(28, $size-sp);
    font-weight: bold;
    color: white;
    background-color: black;

    @include media(pc) {
      @include font-vw(20, $size-pc);
    }
  }

  @include e(slide-date) {
    display: block;
    @include font-vw(28, $size-sp);

    @include media(pc) {
      @include font-vw(20, $size-pc);
    }
  }

  @include e(slide-img) {
    position: relative;
    @include center(_vw(243, $size-sp));
    z-index: 1;

    @include media(pc) {
      width: _vw(243, $size-pc);
      max-width: 243px;
    }
  }

  @include e(slide-figure) {
    // @include center(_vw(243, $size-sp));
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    @include media(pc) {
      width: _vw(243, $size-pc);
      max-width: 243px;
      transition: transform 0.5s $ease-out-cubic;
    }
  }

  @include e(circle-wrap) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
    transition: transform 1s;
    transform: scale(1.3);
    z-index: -1;

    .is-output-active & {
      transform: scale(1.5) rotate(20deg);
    }

    @include m(1) {
      #{$selector}__slide-circle--1,
      #{$selector}__slide-circle--2 {
        animation: rotate5 5s linear reverse infinite;
      }
    }

    @include m(2) {
      #{$selector}__slide-circle--1,
      #{$selector}__slide-circle--2 {
        animation: rotate5 5s linear infinite;
      }
    }

    @include m(3) {
      #{$selector}__slide-circle--1,
      #{$selector}__slide-circle--2 {
        animation: rotate6 5s linear reverse infinite;
      }
    }

    @include m(4) {
      #{$selector}__slide-circle--1,
      #{$selector}__slide-circle--2 {
        animation: rotate6 5s linear infinite;
      }
    }
  }

  @include e(slide-circle) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
    border-radius: 50%;
    border: 1px solid $color-blue;

    @include m(1) {
      // animation: rotate5 5s linear infinite;
      .is-output-active & {
        animation: rotate3 3s linear infinite;
      }
    }

    @include m(2) {
      // animation: rotate5 5s linear infinite;
      .is-output-active & {
        animation: rotate4 3s linear infinite;
      }
    }

    .p-top-output__slide-item--yellow & {
      border-color: $color-yellow-output;
    }
  }

  @include e(slide-summary) {
    width: _vw(507, $size-sp);
    margin: 18px 0 0 _vw(-44, $size-sp);
    letter-spacing: 2px;

    @include media(pc) {
      width: 100%;
      margin: _vw(40, $size-pc) 0 0 0;
      padding: 0 _vw(20, $size-pc);
    }
  }

  @include e(slide-heading) {
    @include font-vw(40, $size-sp);
    @include line-height(60, 40);

    @include media(pc) {
      @include font-vw(28, $size-pc);
      @include line-height(40, 28);
    }

    @include media(xl) {
      @include font-rem(28);
    }
  }

  @include e(slide-text) {
    margin-top: 14px;
    @include font-vw(28, $size-sp);
    @include line-height(48, 28);

    @include media(pc) {
      @include font-vw(24, $size-pc);
      @include line-height(40, 24);
    }

    @include media(xl) {
      @include font-rem(24);
    }
  }
}
</style>
