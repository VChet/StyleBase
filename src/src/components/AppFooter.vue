<template>
  <footer>
    <div class="container">
      <button class="link" type="button" @click="$emit('open-nav-link', 'showPrivacyModal')">Privacy Policy</button>
      <a href="https://github.com/VChet/StyleBase" rel="noopener" target="_blank">Code on GitHub</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style lang="scss" scoped>
footer {
  background-color: var(--color-main-lightest);
  font-size: 14px;

  .container {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    text-align: right;
  }

  button,
  a:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
