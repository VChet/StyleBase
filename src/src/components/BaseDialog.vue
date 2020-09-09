<template>
  <transition :name="transition">
    <div v-if="open" v-click-outside="clickOutside" class="base-dialog" :class="size" @keydown.esc="onClose">
      <div class="base-dialog-window" :class="{ loading: loading }" @clickOutside="onClickOutside">
        <div class="base-dialog-header">
          <slot name="header"></slot>
          <close-button v-if="!closeButtonHidden" @click="onClose" />
        </div>

        <div class="base-dialog-body">
          <slot name="body"></slot>
        </div>

        <!-- <div v-if="loading" class="section-loading">
          <base-spinner size="5rem" />
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
import clickOutside from '@/directives/clickOutside'
import CloseButton from '@/components/CloseButton.vue'

export default {
  name: 'BaseDialog',
  components: {
    CloseButton
  },
  directives: {
    clickOutside
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator(size) {
        return ['small', 'medium', 'large', 'extra-large', 'maximum'].indexOf(size) !== -1
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
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
    headerHidden: {
      type: Boolean,
      required: false,
      default: false
    },
    closeButtonHidden: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onClickOutside() {
      if (this.clickOutside) {
        this.$emit('close')
      } else {
        this.$emit('clickOutside')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-dialog {
  top: 5vh;
  // min-width: calc(#{$viewport-minimum} - 40px);
  min-width: calc(320px - 40px);
  max-width: calc(100% - 40px);
  min-height: 300px;
  border-radius: 0.3rem;
  width: 90%;
  background: rgb(255, 255, 255);
  border: 0;
  outline: 0;
  padding: 0;
  overflow: hidden;
  pointer-events: auto;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  background-color: #faf6f0;
  border: 1px solid #b8977e;

  &.small {
    // max-width: calc(#{$breakpoint-small} - 40px);
    max-width: 360px;
  }

  &.medium {
    // max-width: calc(#{$breakpoint-medium} - 40px);
    max-width: 500px;
  }

  // &.large {
  //   max-width: calc(#{$breakpoint-large} - 40px);
  // }

  &.extra-large {
    // max-width: calc(#{$breakpoint-extra-large} - 40px);
    max-width: 1130px;
  }

  // &.maximum {
  //   max-width: calc(#{$breakpoint-maximum} - 40px);
  // }
}

.base-dialog-window {
  min-height: inherit;

  &.loading {
    opacity: 0.3;
    user-select: none;
    pointer-events: none;
  }
}

.base-dialog-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}

.base-dialog-body {
  display: flex;
  padding: 1rem;
  overflow-wrap: break-word;
  overflow-y: auto;
  max-height: 85vh;
  min-height: calc(300px - 3rem - 1px);
}

.base-dialog-body-header {
  display: flex;
}

.close-button {
  margin-left: auto;
}

.section-loading {
  position: absolute;
  top: 0;
}

.transition-dialog {
  &-enter-active {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.2s ease-in, transform 0.2s ease-in;
  }

  &-enter {
    opacity: 0;
    transform: translateY(-2vh);
  }

  &-enter-to {
    opacity: 1;
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(-50vh);
  }
}
</style>
