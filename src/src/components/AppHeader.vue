<template>
  <header>
    <div class="container">
      <div class="logo">stylebase</div>

      <div class="search-container">
        <label for="search" class="visually-hidden">Style search</label>
        <input id="search" type="text" placeholder="Search..." />
      </div>

      <nav>
        <button class="link" @click="$emit('open-nav-link', 'showAddStyleModal')">add style</button>
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
      user-select: none;
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
  }

  nav button {
    border-radius: 0;
    border-bottom: 3px solid transparent;
    outline: 0;
    font-size: 18px;
    font-weight: bold;
    color: var(--color-text);
    transition: color 0.2s, border-color 0.2s;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    &:focus {
      color: var(--color-main);
      border-color: var(--color-focus);
    }
  }
}
</style>
