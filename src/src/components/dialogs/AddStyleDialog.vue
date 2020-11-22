<template>
  <BaseDialog v-if="open" size="small" @close="$emit('close')">
    <form @submit.prevent="submitStyle">
      <div class="dialog-title">Add new style</div>
      <div class="dialog-input">
        <input v-model.trim="url" type="text" placeholder="Link to GitHub repository" />
        <CloseButton v-show="url" aria-label="Clear the input" @click="url = ''" />
      </div>
      <div class="dialog-buttons">
        <button class="style-button" type="button" @click="$emit('close')">Not now</button>
        <button class="style-button-filled" type="submit" :disabled="isSubmitting">Add</button>
      </div>
    </form>
  </BaseDialog>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

import BaseDialog from '@/components/dialogs/BaseDialog';
import CloseButton from '@/components/CloseButton.vue';

export default {
  name: 'AddStyleDialog',
  components: {
    BaseDialog,
    CloseButton
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
      isSubmitting: false
    };
  },
  methods: {
    ...mapActions({
      flashAlert: 'alert/flashAlert'
    }),
    submitStyle() {
      if (!this.url || this.isSubmitting) return;
      if (!this.url.includes('github.com')) {
        return this.flashAlert({ type: 'warning', message: 'Should be github.com repository' });
      }
      this.isSubmitting = true;
      axios
        .post('/api/style/add', { url: this.url })
        .then((response) => {
          this.url = '';
          this.$emit('close');
          this.flashAlert({ type: 'success', message: `"${response.data.style.name}" added successfully` });
        })
        .catch((error) => {
          this.flashAlert({ type: 'error', message: error.response.data.error });
        })
        .finally(() => {
          this.isSubmitting = false;
          this.$gtag.event('add style request', { event_category: 'add style dialog' });
        });
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
}
</style>
