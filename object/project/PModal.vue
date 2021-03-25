<template>
  <div class="p-modal">
    <div
      class="p-modal__overlay"
      @click="hide"
    />
    <div class="p-modal__main">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'BaseModal',
  methods: {
    ...mapMutations('modal', ['hide'])
  }
}
</script>

<style lang="scss">
.p-modal {
  overflow-y: scroll;
  @include position(fixed, $top: 0, $left: 0);
  @include size(100%);
  z-index: 999;

  @include e(overlay) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
  }

  @include e(main) {
    @include media(pc) {
      max-width: 1700px;
      width: 100%;
      margin: 0 auto;
      padding: 0 _vw(162, $size-pc);
    }
  }

  @include e(head) {
    position: relative;
    padding: 0 24px;

    @include media(pc) {
      position: relative;
      padding: 0;
    }
  }

  @include e(body) {
    position: relative;
    @include center(_vw(650, $size-sp));
    margin-top: _vw(134, $size-sp);
    letter-spacing: 0.04em;

    @include media(pc) {
      width: 100%;
      margin-top: 40px;
    }
  }

  @include e(foot) {
    position: relative;
    width: 100%;
    z-index: -1;

    @include media(pc) {
      position: static;
      max-width: 1383px;
      margin: _vw(-220, $size-pc) auto 0;
      padding: 0;
    }
  }

  @include e(arrows) {
    padding: 28px 0 0;

    @include media(pc) {
      position: relative;
      @include center-flex();
      padding: _vw(60, $size-pc) 0;

      @include pseudo(before) {
        @include center-translate();
        @include size(1, 18);
        margin-top: -2px;
        background-color: black;
      }
    }
  }

  @include e(btn) {
    width: _vw(76, $size-sp);

    @include m(next) {
      margin-left: 8px;
    }

    @include media(pc) {
      @include center-flex();
      width: auto;
      margin: 0 20px;

      > .c-arrow {
        margin-bottom: 8px;
      }

      .c-arrow__picture {
        transition: transform 0.3s $ease-out-cubic;
      }

      &:hover {
        .c-arrow__picture {
          transform: translate(8px, 0);
        }
      }
    }
  }

  @include e(label) {
    margin: -6px 8px 0;
  }

  @include e(contact) {
    @include position(absolute, $top: 74px, $right: 17px);
    z-index: 3;

    @include media(pc) {
      top: _vw(232, $size-pc);
      right: 4px;
    }
  }

  @include e(contact-dt) {
    @include center(10);

    @include media(pc) {
      width: _vw(29, $size-pc);
      max-width: 29px;
    }
  }

  @include e(contact-dd) {
    display: flex;
    flex-direction: column;
    margin-top: 14px;

    @include media(pc) {
      margin-top: 74px;
    }
  }

  @include e(share-link) {
    position: relative;
    display: block;

    svg {
      fill: $color-sns !important;
      transition: fill 0.5s $ease-out-cubic;
    }

    &:hover {
      svg {
        fill: $color-sns-hover !important;
      }
    }

    @include m(tw) {
      @include size(24, 18);
      margin-top: 26px;

      @include media(pc) {
        margin-top: _vw(82, $size-pc);
        @include size(_vw(85, $size-pc), _vw(63, $size-pc));
      }
    }

    @include m(fb) {
      @include size(23);

      @include media(pc) {
        @include size(_vw(78, $size-pc));
        max-width: 78px;
        max-height: 78px;
      }
    }
  }

  @include e(share-svg) {
    @include position(absolute, $top: 0, $left: 0);
    @include size(100%);
  }

  @include e(close) {
    @include position(absolute, $top: 8px, $right: 2px);
    @include size(56);

    @include pseudo(both) {
      @include center-translate();
      @include size(38, 1);
      background-color: black;
      transform-origin: 0 0;
    }

    @include pseudo(before) {
      transform: rotate(45deg) translate(-50%, -50%);
    }

    @include pseudo(after) {
      transform: rotate(-45deg) translate(-50%, -50%);
    }

    @include media(pc) {
      left: 0;
      right: auto;
      margin: _vw(30, $size-pc) 0 0 _vw(-140, $size-pc);
      @include size(_vw(110, $size-pc));

      @include pseudo(both) {
        @include size(100%, 1);
      }
    }
  }

  @include e(bg-name) {
    @include position(
      absolute,
      $top: _vw(16, $size-sp),
      $left: _vw(-12, $size-sp)
    );
    z-index: -1;
    opacity: 0.7;

    img {
      animation: fadeIn 2s $ease-out-cubic both;
    }

    @include m(shinjo) {
      width: _vw(585, $size-sp);

      @include media(pc) {
        width: _vw(956, $size-modal-pc);
        max-width: 956px;
      }
    }

    @include m(yamashita) {
      width: _vw(671, $size-sp);

      @include media(pc) {
        top: _vw(46, $size-modal-pc);
        left: _vw(5, $size-modal-pc);
        width: _vw(1392, $size-modal-pc);
        max-width: 1392px;
      }

      @include media(lmodal) {
        top: 46px;
        left: 5px;
      }
    }

    @include m(kuda) {
      width: _vw(424, $size-sp);

      @include media(pc) {
        top: _vw(32, $size-modal-pc);
        left: _vw(-14, $size-modal-pc);
        width: _vw(716, $size-modal-pc);
        max-width: 716px;
      }

      @include media(lmodal) {
        top: 32px;
        left: -14px;
      }
    }

    @include m(akamine) {
      width: _vw(686, $size-sp);

      @include media(pc) {
        top: _vw(32, $size-modal-pc);
        left: _vw(5, $size-modal-pc);
        width: _vw(1355, $size-modal-pc);
        max-width: 1355px;
      }

      @include media(lmodal) {
        top: 32px;
        left: 5px;
      }
    }
  }

  @include e(name) {
    @include font-vw(50, $size-sp);
    font-weight: bold;
    letter-spacing: 0.2em;
    animation: slideUpIn 1.2s 0.4s $ease-out-cubic both;

    @include media(pc) {
      @include font-vw(80, $size-modal-pc);
    }

    @include media(lmodal) {
      @include font-rem(80);
    }
  }

  @include e(position) {
    margin-top: 2px;
    @include font-vw(30, $size-sp);
    font-weight: bold;
    @include line-height(50, 30);
    animation: slideUpIn 1.2s 0.55s $ease-out-cubic both;

    @include media(pc) {
      margin-top: 0;
      @include font-vw(30, $size-modal-pc);
      @include line-height(60, 30);
    }

    @include media(lmodal) {
      @include font-rem(30);
    }
  }

  @include e(text) {
    @include font-vw(24, $size-sp);
    font-weight: bold;
    @include line-height(54, 24);
    margin-top: _vw(176, $size-sp);
    animation: slideUpIn 1.2s 0.7s $ease-out-cubic both;

    @include media(pc) {
      @include font-vw(24, $size-modal-pc);
      margin: _vw(490, $size-modal-pc) 0 0;
      @include line-height(58, 24);

      @include m(kuda) {
        margin: _vw(294, $size-modal-pc) 0 0;
      }

      @include m(akamine) {
        margin: _vw(412, $size-modal-pc) 0 0;
      }
    }

    @include media(xl) {
      @include font-rem(24);
    }
  }

  @include e(thumb) {
    width: _vw(580, $size-sp);
    margin-left: auto;
    animation: scaleIn 1s 0.6s both;
    transform-origin: 100% 100%;

    @include media(pc) {
      width: _vw(1075, $size-pc);
      max-width: 1075px;
      margin-right: _vw(-160, $size-pc);
    }

    @include m(shinjo) {
      margin-top: _vw(-206, $size-sp);

      @include media(pc) {
        margin-top: _vw(-206, $size-pc);
      }
    }

    @include m(yamashita) {
      margin-top: _vw(-620, $size-sp);

      @include media(pc) {
        margin-top: _vw(-470, $size-pc);
      }
    }

    @include m(kuda) {
      margin-top: _vw(-606, $size-sp);

      @include media(pc) {
        margin-top: _vw(-470, $size-pc);
      }
    }

    @include m(akamine) {
      margin-top: _vw(-38, $size-sp);

      @include media(pc) {
        margin-top: _vw(150, $size-pc);
      }
    }
  }
}
</style>
