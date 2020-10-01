<template>
  <footer>
    <div class="container">
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
}
</style>
