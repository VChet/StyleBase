<template>
  <base-dialog v-if="open" size="small" @close="$emit('close')">
    <template>
      <div class="dialog-title">Add new style</div>
      <div class="dialog-input">
        <input v-model.trim="url" type="text" placeholder="Link to GitHub repository" />
        <close-button v-show="url" @click="url = ''" />
      </div>
      <div class="dialog-buttons">
        <button class="style-button" type="button" :disabled="isSubmitting" @click="$emit('close')">Not now</button>
        <vue-recaptcha
          ref="recaptcha"
          tabindex="0"
          size="invisible"
          :sitekey="sitekey"
          @verify="submitStyle"
          @expired="onCaptchaExpired"
        >
          <button class="style-button-filled" type="submit">Add</button>
        </vue-recaptcha>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import axios from 'axios';
import VueRecaptcha from 'vue-recaptcha';

import BaseDialog from '@/components/dialogs/BaseDialog';
import CloseButton from '@/components/CloseButton.vue';

export default {
  name: 'StyleInfoDialog',
  components: {
    BaseDialog,
    CloseButton,
    VueRecaptcha
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
      url: '',
      isSubmitting: false,
      sitekey: process.env.VUE_APP_RECAPTCHA_TOKEN
    };
  },
  methods: {
    submitStyle(recaptchaToken) {
      if (!this.url || this.isSubmitting) return;
      if (!this.url.includes('github.com')) return alert('Should be github.com repository');
      this.isSubmitting = true;
      axios
        .post('/api/style/add', {
          recaptchaToken,
          url: this.url
        })
        .then((response) => {
          this.url = '';
          this.$emit('close');
          alert(`"${response.name}" added successfully`);
        })
        .catch((error) => {
          alert(error.response.data.error);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
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

.dialog-input {
  position: relative;
  margin-bottom: 1.5rem;

  input {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 0 15px 0 15px;
  }

  .close-button {
    width: 1.5rem;
    height: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;

  button {
    width: 170px;
    height: 50px;
    font-size: 18px;
  }
}
</style>
