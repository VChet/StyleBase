<template>
  <div class="base-dialog-wrapper">
    <div
      ref="modal"
      v-click-outside="closeModal"
      class="base-dialog"
      :class="size"
      tabindex="-1"
      @keydown.esc="closeModal"
    >
      <CloseButton v-if="!closeButtonHidden" aria-label="Close the modal" @click="closeModal" />
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue3-click-away';

import CloseButton from '@/components/CloseButton.vue';

export default {
  name: 'BaseDialog',
  components: {
    CloseButton
  },
  directives: {
    ClickOutside: directive
  },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(size) {
        return ['small', 'medium', 'large', 'extra-large', 'maximum'].includes(size);
      }
    },
    closeButtonHidden: {
      type: Boolean,
      default: false
    },
    hasRoute: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$refs.modal.focus();
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('no-scroll');
  },
  unmounted() {
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = null;
    }, 200); // transition-dialog duration
  },
  methods: {
    closeModal() {
      this.hasRoute ? this.$router.back() : this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.base-dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.base-dialog {
  position: relative;
  top: 5vh;
  width: 80%;
  margin: auto auto 1rem auto;
  padding: 2rem;
  overflow: hidden;
  background-color: var(--color-bg);
  border-radius: 0.3rem;

  @include media-size-mobile {
    width: unset;
    margin: 0;
    padding: 1.5rem;
  }
  &:focus {
    outline: none;
  }
  &.small {
    max-width: 450px;
  }
  &.medium {
    max-width: 600px;
  }
  &.large {
    max-width: 800px;
  }
  &.extra-large {
    max-width: 1130px;
  }
}
</style>
