<template>
  <header>
    <div class="container">
      <a class="logo" href="/" rel="home">StyleBase</a>

      <div class="search-container">
        <label for="search" class="visually-hidden">Style search</label>
        <input id="search" type="text" placeholder="Search..." />
      </div>

      <nav>
        <button class="link" @click="$emit('open-nav-link', 'showHowtoUseModal')">How to Use</button>
        <button class="link" @click="$emit('open-nav-link', 'showAddStyleModal')">Add Style</button>
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

    .search-container {
      display: flex;
      flex: 0 0 50%;
      margin: 0 1rem;

      input {
        width: 100%;
        height: 40px;
        border: 2px solid var(--color-border);
        border-radius: 5px;
        font-size: 18px;
        padding-left: 18px;
      }

      @include media-size-mobile {
        display: none;
      }
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
      }
    }
  }
}
</style>
