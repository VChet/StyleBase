<template>
  <base-dialog v-if="open" size="medium" @close="$emit('close')">
    <template>
      <div class="dialog-title">How to use this styles?</div>

      <ol class="dialog-list">
        <li>
          <div class="item-title">Install the extension, which will include styles into webpages.</div>
          <span v-if="browser">
            Looks like you're using
            <span class="browser">{{ browser }}</span> browser.
            <a :href="browserList[browser]" rel="noopener" target="_blank">Install extension for {{ browser }}</a>
            or choose a browser manually:
          </span>
          <span v-else>Choose extension depending on your browser:</span>
          <ul>
            <li v-for="(link, item, index) in browserList" :key="index">
              <a :href="link" rel="noopener" target="_blank">{{ item }}</a>
            </li>
          </ul>
        </li>
        <li>
          Choose a style from our collection and click install, extension will ask you to install new usercss, accept it
        </li>
        <li>Style is installed and ready to use</li>
      </ol>

      <div class="dialog-buttons">
        <button class="style-button-filled" type="button" @click="$emit('close')">Got it!</button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog';

export default {
  name: 'StyleInfoDialog',
  components: {
    BaseDialog
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
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
.dialog-title {
  font-size: 30px;
  margin-bottom: 1rem;
  text-align: center;
}

.dialog-list {
  font-size: 18px;
  line-height: 28px;

  ul {
    display: inline-flex;
    list-style: none;

    li:not(:first-child) {
      margin-left: 0.5rem;
    }
  }

  .browser {
    font-weight: bold;
  }

  a {
    text-decoration: underline;
  }
}

.dialog-buttons {
  text-align: center;

  button {
    width: 170px;
    height: 50px;
    font-size: 18px;
  }
}
</style>
