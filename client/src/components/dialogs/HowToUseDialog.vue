<template>
  <BaseDialog size="medium">
    <h1 class="dialog-title">How to Use</h1>
    <h2>Installing styles</h2>
    <ol class="dialog-list">
      <li>
        <div class="item-title">Install a userstyle manager, which will include styles into webpages.</div>
        <span v-if="browser">
          Looks like you're using <b>{{ browser }}</b> browser.
          <a :href="browserList[browser]" rel="noopener" target="_blank">Install extension for {{ browser }}</a>
          or choose a browser manually:
        </span>
        <span v-else>Choose extension depending on your browser:</span>
        <ul class="browser-list">
          <li v-for="(link, item, index) in browserList" :key="index">
            <a :href="link" rel="noopener" target="_blank">{{ item }}</a>
          </li>
        </ul>
      </li>
      <li>Choose a style and click install, extension will open a new tab showing some basic information & options</li>
      <li>Click on "Install style" to install the style</li>
      <li>
        Once installed, you will be redirected to editor page with the newly installed/updated UserCSS loaded. Close
        this if you don't want or need to modify the style.
      </li>
    </ol>
    <a href="https://github.com/openstyles/stylus/wiki/UserCSS#how-do-i-install-usercss" rel="noopener" target="_blank">
      More information
    </a>
    <h2>
      <a href="https://github.com/openstyles/stylus/wiki/Writing-styles#writing-styles" rel="noopener" target="_blank">
        Writing styles
      </a>
    </h2>
    <div class="dialog-buttons">
      <button class="style-button-filled" type="button" @click="$router.back()">Got it!</button>
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog.vue';

export default {
  name: 'HowToUseDialog',
  components: {
    BaseDialog
  },
  data() {
    return {
      browser: '',
      browserList: {
        Chrome: 'https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne',
        Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/styl-us',
        Opera: 'https://addons.opera.com/en-gb/extensions/details/stylus',
        Safari: 'https://cascadea.app/'
      }
    };
  },
  beforeMount() {
    this.detectBrowser();
  },
  methods: {
    detectBrowser() {
      if (navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR')) {
        this.browser = 'Opera';
      } else if (navigator.userAgent.includes('Chrome')) {
        this.browser = 'Chrome';
      } else if (navigator.userAgent.includes('Safari')) {
        this.browser = 'Safari';
      } else if (navigator.userAgent.includes('Firefox')) {
        this.browser = 'Firefox';
      }
    }
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: underline;
}

.dialog-title {
  font-size: 30px;
  margin-bottom: 1rem;
  text-align: center;
}

.dialog-list {
  font-size: 18px;
  line-height: 28px;
  padding-left: 1rem;

  > li {
    padding: 0.5rem 0;
    @include media-size-mobile {
      padding: 0.25rem 0;
    }
  }

  .browser-list {
    display: inline;
    list-style: none;

    li {
      display: inline;
      &:not(:last-child):after {
        content: ', ';
      }
    }
  }
}

.dialog-buttons {
  margin-top: 1rem;
  text-align: center;
}
</style>
