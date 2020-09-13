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
        <div class="close-button-container">
          <close-button v-if="!closeButtonHidden" @click="onClose" />
        </div>

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
    console.log(this.$refs.modal.focus());
    this.$refs.modal.focus();
  },
  methods: {
    onClose() {
      console.log('onClose');
      this.$emit('close');
    },
    onClickOutside() {
      console.log('1');
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
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.base-dialog-window {
  position: relative;
  top: 5vh;
  background-color: #faf6f0;
  max-height: 90%;
  width: 80%;
  margin: auto;
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;
  overflow: hidden;
  border-radius: 0.3rem;

  &:focus {
    outline: none;
  }

  &.small {
    max-width: 360px;
  }

  &.medium {
    max-width: 500px;
  }

  &.extra-large {
    max-width: 1130px;
  }
}

.close-button-container {
  text-align: right;
  margin-bottom: 0.5rem;
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
