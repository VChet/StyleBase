<template>
  <transition-group class="alert-wrapper" name="alert" tag="ul">
    <li v-for="alert in alerts" :key="alert.id" class="alert" :class="alert.type" @click.stop="close(alert.id)">
      <div class="content">{{ alert.message }}</div>
    </li>
  </transition-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Alert',
  computed: {
    ...mapGetters({
      alerts: 'alert/getAlerts'
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
.alert-wrapper {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 2rem 2rem;
  list-style: none;

  .alert {
    width: 350px;
    background-color: var(--color-text-bg);
    border: 1px solid var(--color-border);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    transition: transform 0.5s, opacity 0.25s;

    &.alert-enter,
    &.alert-leave-to {
      transform: translateY(100%);
      opacity: 0;
      z-index: -1;
    }
    &.alert-leave-active {
      position: absolute;
      right: 0;
      bottom: 0;
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
}
</style>
