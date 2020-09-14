<template>
  <button class="close-button" @click="$emit('click')">
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
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
}

.cross-first-line {
  height: 1px;
  left: 0px;
  top: 50%;
  transform: translate(0%, -50%) rotate(45deg);
  width: 100%;
}

.cross-second-line {
  height: 100%;
  left: 50%;
  top: 0px;
  transform: translate(-50%, 0%) rotate(45deg);
  width: 1px;
}
</style>
