<template>
  <button class="close-button" type="button" @click="$emit('click')">
    <span class="cross-first-line" />
    <span class="cross-second-line" />
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
  cursor: pointer;

  &:hover .cross-first-line,
  &:hover .cross-second-line {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:active .cross-first-line,
  &:active .cross-second-line {
    transform: rotate(55deg);
    transition: transform 0.3s;
  }
}

.cross-first-line,
.cross-second-line {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s;
}

.cross-first-line {
  width: 100%;
  height: 1px;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%) rotate(45deg);
}

.cross-second-line {
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%) rotate(45deg);
}
</style>
