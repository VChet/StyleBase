<template>
  <base-dialog v-if="open" class="content" size="large" @close="$emit('close')">
    <h1 class="dialog-title">{{ $t('privacy.title') }}</h1>

    <i18n tag="p" path="privacy.main">
      <a href="mailto:feedback@stylebase.cc" rel="noopener">feedback@stylebase.cc</a>
    </i18n>

    <h2>{{ $t('privacy.information.title') }}</h2>
    <p>{{ $t('privacy.information.text') }}</p>

    <h2>{{ $t('privacy.logs.title') }}</h2>
    <p>{{ $t('privacy.logs.text') }}</p>

    <h2>{{ $t('privacy.cookies.title') }}</h2>
    <i18n tag="p" path="privacy.cookies.text">
      <a href="https://www.cookieconsent.com/what-are-cookies/">
        {{ $t('privacy.cookies.website') }}
      </a>
    </i18n>

    <h2>{{ $t('privacy.consent.title') }}</h2>
    <p>{{ $t('privacy.consent.text') }}</p>

    <div class="dialog-buttons">
      <button class="style-button-filled" type="button" @click="$emit('close')">
        {{ $t('privacy.close') }}
      </button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog';

export default {
  name: 'PrivacyPolicyDialog',
  components: {
    BaseDialog
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
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

p {
  font-size: 18px;
  line-height: 28px;

  a {
    text-decoration: underline;
  }
}

.dialog-buttons {
  margin-top: 1.5rem;
  text-align: center;
}
</style>
