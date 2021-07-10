<template>
  <header :class="{ active: menuIsActive }">
    <div class="container">
      <button class="link logo" type="button" @click="reload">StyleBase</button>
      <div class="mode-switch">
        <input
          id="mode-input"
          class="visually-hidden"
          type="checkbox"
          :value="darkTheme"
          @change="darkTheme = !darkTheme"
        />
        <label for="mode-input">
          <span v-if="darkTheme" role="img" aria-label="Dark mode">🌒</span>
          <span v-else role="img" aria-label="Light mode">☀️</span>
        </label>
      </div>
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
        <button class="link" type="button" @click="$router.push({ name: 'HowToUseDialog' })">How to Use</button>
        <button class="link" type="button" @click="$router.push({ name: 'AddStyleDialog' })">Add Style</button>
        <button v-if="!user" class="link" type="button" @click="$router.push({ name: 'LoginDialog' })">Login</button>
        <template v-else>
          <button type="button" class="link" @click="$router.push({ name: 'Profile' })">{{ user.username }}</button>
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
      darkTheme: false,
      menuIsActive: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  watch: {
    darkTheme(isDark) {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('dark-theme', isDark);
    }
  },
  mounted() {
    const storedMode = localStorage.getItem('dark-theme');
    if (storedMode) {
      this.darkTheme = JSON.parse(storedMode);
    } else {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
      this.darkTheme = darkMode.matches;
      darkMode.addEventListener('change', (query) => {
        this.darkTheme = query.matches;
      });
    }
  },
  methods: {
    ...mapActions({
      setOwnerFilter: 'styleGrid/setOwnerFilter',
      resetFilters: 'styleGrid/resetFilters'
    }),
    reload() {
      if (this.$route.name === 'Home') {
        this.resetFilters();
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        this.$router.push({ name: 'Home' });
      }
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

  .mode-switch {
    margin-left: auto;
    margin-right: 1.5rem;
    label {
      border-bottom: 2px solid transparent;
      font-size: 18px;
      cursor: pointer;
    }
    input:focus + label {
      border-color: var(--color-focus);
    }
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
    display: flex;
    gap: 0.75rem 1.5rem;

    @include media-size-tablet {
      margin-top: 0.75rem;
      flex-basis: 100%;
      flex-direction: column;
      align-items: flex-start;
      background-color: var(--color-bg);
      animation: slide-in 0.5s forwards;
      overflow: hidden;
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
