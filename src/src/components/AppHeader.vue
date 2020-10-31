<template>
  <header :class="{ active: menuIsActive }">
    <div class="container">
      <button class="link logo" type="button" @click="scrollToTop">StyleBase</button>
      <button
        class="link burger-menu"
        type="button"
        :aria-label="menuIsActive ? 'Close the menu' : 'Open the menu'"
        :aria-expanded="menuIsActive ? 'true' : 'false'"
        @click="menuIsActive = !menuIsActive"
      >
        <span></span>
        <span></span>
      </button>
      <nav>
        <button class="link" type="button" @click="$emit('open-nav-link', 'showHowtoUseModal')">How to Use</button>
        <button class="link" type="button" @click="$emit('open-nav-link', 'showAddStyleModal')">Add Style</button>
        <a v-if="!user.username" href="/login">Login</a>
        <template v-else>
          <button class="link" type="button" @click="setOwnerFilter(user.username)">{{ user.username }}</button>
          <a href="/logout">Logout</a>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      menuIsActive: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    ...mapActions({
      setOwnerFilter: 'styleGrid/setOwnerFilter'
    }),
    scrollToTop() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-bg);

  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  button,
  a {
    outline: 0;
    border-radius: 0;
    border-bottom: 2px solid transparent;
    font-size: 18px;

    &:focus {
      border-color: var(--color-focus);
    }
  }

  .logo {
    font-size: 28px;
    font-weight: bold;
  }

  .burger-menu {
    display: none;
    position: relative;
    width: 2rem;
    height: 2rem;

    @include media-size-tablet {
      display: inline-block;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-text);
      transition: transform 0.3s;

      &:nth-child(1) {
        top: 10px;
      }
      &:nth-child(2) {
        bottom: 10px;
      }
    }

    &:focus {
      border-color: transparent;

      span {
        background-color: var(--color-focus);
      }
    }
  }

  nav {
    button,
    a {
      margin-left: 1.5rem;
    }

    @include media-size-tablet {
      display: flex;
      flex-basis: 100%;
      flex-direction: column;
      align-items: flex-start;
      background-color: var(--color-bg);
      animation: slide-in 0.5s forwards;
      overflow: hidden;

      button,
      a {
        margin-top: 0.75rem;
        margin-left: 0rem;
      }
    }
  }

  &.active {
    .burger-menu span {
      top: 13px;

      &:nth-child(1) {
        transform: rotate(45deg);
      }
      &:nth-child(2) {
        transform: rotate(-45deg);
      }
    }

    nav {
      animation: slide-out 0.5s forwards;
    }
  }
  @keyframes slide-out {
    from {
      max-height: 0;
    }
    to {
      max-height: 10rem;
    }
  }
  @keyframes slide-in {
    from {
      max-height: 10rem;
    }
    to {
      max-height: 0;
    }
  }
}
</style>
