<template>
  <footer>
    <div class="container">
      <ul class="link-list">
        <li>
          <a href="/rss">RSS Feed</a>
        </li>
        <li>
          <a href="mailto:feedback@stylebase.cc" rel="noopener">Contact Us</a>
        </li>
        <li>
          <button class="link" type="button" @click="$emit('open-nav-link', 'showPrivacyModal')">Privacy Policy</button>
        </li>
        <li>
          <a href="https://github.com/VChet/StyleBase" rel="noopener" target="_blank">Code on GitHub</a>
        </li>
      </ul>
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
  }

  .link-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.75rem 1rem;
    margin: 0;
    list-style-type: none;

    @include media-size-mobile {
      flex-flow: column nowrap;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 16px;
    }
  }
}
</style>
