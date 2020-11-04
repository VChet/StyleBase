<template>
  <div class="alert" :class="[{ active: state.show }, state.type]" @click.stop="close">
    <div class="content">{{ state.message }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Alert',
  computed: {
    ...mapGetters({
      state: 'alert/getState'
    })
  },
  methods: {
    ...mapActions({
      close: 'alert/close'
    })
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  right: -100%;
  bottom: 0;
  width: 350px;
  margin: 0 2rem 2rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid var(--color-border);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  z-index: 20;
  transition: right 0.5s;

  &.active {
    right: 0;
  }
  &.info {
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }
  &.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &.warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  &.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  @include media-size-mobile {
    width: calc(100% - 2rem);
    margin: 0 1rem 1rem;
  }

  .content {
    padding: 1.5rem 1rem;
  }
}
</style>
