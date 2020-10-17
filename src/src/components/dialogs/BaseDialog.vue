<template>
  <transition :name="transition">
    <div class="base-dialog">
      <div
        ref="modal"
        v-click-outside="clickOutside"
        class="base-dialog-window"
        :class="size"
        tabindex="-1"
        @clickOutside="onClickOutside"
        @keydown.esc="onClose"
      >
        <close-button v-if="!closeButtonHidden" aria-label="Close the modal" @click="onClose" />

        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import clickOutside from '@/directives/clickOutside';
import CloseButton from '@/components/CloseButton.vue';

export default {
  name: 'BaseDialog',
  components: {
    CloseButton
  },
  directives: {
    clickOutside
  },
  props: {
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator(size) {
        return ['small', 'medium', 'large', 'extra-large', 'maximum'].includes(size);
      }
    },
    clickOutside: {
      type: Boolean,
      required: false,
      default: true
    },
    transition: {
      type: String,
      required: false,
      default: 'transition-dialog'
    },
    closeButtonHidden: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    this.$refs.modal.focus();
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onClickOutside() {
      if (this.clickOutside) {
        this.$emit('close');
      } else {
        this.$emit('clickOutside');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.base-dialog-window {
  position: relative;
  top: 5vh;
  width: 80%;
  margin: auto auto 1rem auto;
  padding: 2rem;
  overflow: hidden;
  background-color: var(--color-bg);
  border-radius: 0.3rem;

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

.transition-dialog {
  &-enter-active {
    transition: opacity 0.2s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.2s ease-in;
  }

  &-enter {
    opacity: 0;
  }

  &-enter-to {
    opacity: 1;
  }

  &-leave-to {
    opacity: 0;

    .base-dialog-window {
      transition: transform 0.2s ease-in;
      transform: translateY(-50vh);
    }
  }
}
</style>
