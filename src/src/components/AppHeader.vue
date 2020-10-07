<template>
  <header>
    <div class="container">
      <button class="link logo" @click="scrollToTop">StyleBase</button>
      <nav>
        <button class="link" type="button" @click="$emit('open-nav-link', 'showHowtoUseModal')">How to Use</button>
        <button class="link" type="button" @click="$emit('open-nav-link', 'showAddStyleModal')">Add Style</button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;

    button,
    a {
      border-radius: 0;
      outline: 0;
      border-bottom: 2px solid transparent;

      &:focus {
        border-color: var(--color-focus);
      }
    }

    .logo {
      font-size: 28px;
      font-weight: bold;

      @include media-size-mobile {
        font-size: 24px;
      }
    }

    nav {
      button {
        font-size: 18px;

        @include media-size-mobile {
          font-size: 16px;
        }

        &:not(:last-child) {
          margin-right: 1.5rem;

          @include media-size-mobile {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
