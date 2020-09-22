<template>
  <header>
    <div class="container">
      <a class="logo" href="/" rel="home">StyleBase</a>
      <nav>
        <button class="link" type="button" @click="$emit('open-nav-link', 'showHowtoUseModal')">How to Use</button>
        <button class="link" type="button" @click="$emit('open-nav-link', 'showAddStyleModal')">Add Style</button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
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

    .logo {
      font-size: 28px;
      font-weight: bold;
    }

    a,
    button {
      border-radius: 0;
      outline: 0;
      border-bottom: 2px solid transparent;
      color: var(--color-text);
      transition: color 0.2s, border-color 0.2s;

      &:hover {
        color: var(--color-main);
      }

      &:focus {
        color: var(--color-main);
        border-color: var(--color-focus);
      }
    }

    nav button {
      font-size: 18px;

      &:not(:last-child) {
        margin-right: 1.5rem;

        @include media-size-mobile {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
