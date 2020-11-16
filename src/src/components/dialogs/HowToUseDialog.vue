<template>
  <base-dialog v-if="open" size="medium" @close="$emit('close')">
    <div class="dialog-title">{{ $t('howToUse.title') }}</div>
    <ol class="dialog-list">
      <li>
        <div>{{ $t('howToUse.1.text') }}</div>
        <i18n v-if="browser" tag="span" path="howToUse.1.browserDetected">
          <span class="browser">{{ browser }}</span>
          <a :href="browserList[browser]" rel="noopener" target="_blank">{{ browser }}</a>
        </i18n>
        <span v-else>{{ $t('howToUse.1.browserNotDetected') }}</span>
        <ul>
          <li v-for="(link, item, index) in browserList" :key="index">
            <a :href="link" rel="noopener" target="_blank">{{ item }}</a>
          </li>
        </ul>
      </li>
      <li>{{ $t('howToUse.2') }}</li>
      <li>{{ $t('howToUse.3') }}</li>
    </ol>
    <div class="dialog-buttons">
      <button class="style-button-filled" type="button" @click="$emit('close')">{{ $t('howToUse.close') }}</button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog';

export default {
  name: 'HowToUseDialog',
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
}
</style>
