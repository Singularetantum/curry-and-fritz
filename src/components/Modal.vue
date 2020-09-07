<template>
  <div ref="domElement" role="dialog" aria-labelledby="modal-title" aria-modal="true" class="b-modal">
    <div class="inner">
      <button class="close" @click="$emit('close')">schließen</button>
      <h2 id="modal-title" class="title" v-if="title">{{ title }}</h2>
      <div class="scroll-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import aria from './mixins/aria';
import toggle from './mixins/toggle';

export default {
  name: 'Modal',
  mixins: [
    aria,
    toggle,
  ],
  props: {
    title: {
      type: String,
      default: '',
    },
    focusAfterClosed: {
      type: HTMLElement,
      default: null,
    },
  },
  data() {
    return {
      lastFocus: null,
      onFocus: this.focusHandler.bind(this),
      onKeyup: this.keyupHandler.bind(this),
    };
  },
  mounted() {
    document.addEventListener('focus', this.onFocus, true);
    document.addEventListener('keyup', this.keyupHandler);
  },
  beforeDestroy() {
    this.lastFocus = null;
    document.removeEventListener('focus', this.onFocus, true);
    document.removeEventListener('keyup', this.keyupHandler);

    if (this.focusAfterClosed) {
      this.focusAfterClosed.focus();
    }
  },
  methods: {
    keyupHandler(event) {
      const keyCode = event.which || event.keyCode;

      if (keyCode === this.keyCode.ESC) {
        event.stopPropagation();
        this.$emit('close');
      }
    },

    focusHandler(event) {
      if (this.ignoreFocusChanges) {
        return;
      }

      if (this.$refs.domElement.contains(event.target)) {
        this.lastFocus = event.target;
      } else {
        this.focusFirstDescendant(this.$refs.domElement);

        if (this.lastFocus === document.activeElement) {
          this.focusLastDescendant(this.$refs.domElement);
        }

        this.lastFocus = document.activeElement;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .b-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.8);

    .inner {
      @include breakpoint(medium) {
        top: 50%;
        left: 50%;
        max-height: 80%;
        width: 50%;
        padding: 20px;
        transform: translate(-50%, -50%);
        background: rgba(80, 80, 80, 0.98);
        border: 1px solid #fff;
      }

      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      height: 100%;
      width: 100%;
      padding: 10px;
      background: rgba(80, 80, 80, 1);
      color: #fff;

      > .title {
        font-weight: 900;
      }
    }

    .close {
      @include breakpoint(medium) {
        top: 20px;
        right: 20px;
      }

      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;

      &:focus,
      &:hover {
        @include breakpoint(medium) {
          transform: scale(1.1);
        }

        text-decoration: underline;
      }
    }

    .scroll-wrapper {
      overflow-x: hidden;
      overflow-y: auto;
      height: calc(100% - 60px);
      border-top: 2px solid #999;

      h3 {
        @include breakpoint(medium) {
          font-size: unset;
        }

        font-size: 16px;
      }
    }
  }
</style>
