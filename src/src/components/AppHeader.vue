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
.container {
  margin: auto;
  max-width: 80%;
  padding-top: 10px;

  @include media-size-tablet {
    max-width: 90%;
  }

  @include media-size-mobile {
    max-width: 95%;
  }
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #faf6f0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;

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
        border: 2px solid #f0f0f0;
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
    color: #47525e;
    transition: color 0.2s, border-color 0.2s;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    &:focus {
      color: #d37b53;
      border-color: orange;
    }
  }
}
</style>
