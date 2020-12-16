<template>
  <button class="close-button" type="button" v-bind="$attrs" @click="$emit('click')">
    <span class="first-line" />
    <span class="second-line" />
  </button>
</template>

<script>
export default {
  name: 'CloseButton'
};
</script>

<style lang="scss" scoped>
.close-button {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border-color: transparent;
  outline: none;
  opacity: 0.3;
  transition: opacity 0.2s, transform 0.2s;

  &:hover,
  &:focus {
    opacity: 0.75;
    transform: scale(1.1);
  }

  > span {
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 50%;
    background-color: #000;

    &.first-line {
      transform: translateX(-50%) rotate(135deg);
    }
    &.second-line {
      transform: translateX(-50%) rotate(45deg);
    }
  }
}
</style>
