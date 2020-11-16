<template>
  <footer>
    <div class="container">
      <a href="mailto:feedback@stylebase.cc" rel="noopener">{{ $t('footer.contact') }}</a>
      <button class="link" type="button" @click="$emit('open-nav-link', 'showPrivacyModal')">
        {{ $t('footer.privacy') }}
      </button>
      <a href="https://github.com/VChet/StyleBase" rel="noopener" target="_blank">{{ $t('footer.code') }}</a>
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
