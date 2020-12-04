<template>
  <BaseDialog v-if="open" size="small" @close="$emit('close')">
    <form @submit.prevent="selectedStyle ? submitStyle() : parseRepository()">
      <div class="dialog-title">Add new style</div>
      <div class="dialog-input">
        <input v-model.trim="url" type="text" placeholder="Link to GitHub repository" />
        <CloseButton v-show="url" aria-label="Clear the input" @click="clear" />
      </div>
      <ul v-show="files.length > 1" class="file-list">
        <li v-for="(file, index) in files" :key="index">
          <input :id="index" v-model="selectedStyle" type="radio" :value="file" :disabled="isSubmitting" />
          <label :for="index">{{ file.name }}</label>
        </li>
      </ul>
      <div class="dialog-buttons">
        <button class="style-button" type="button" @click="$emit('close')">Not now</button>
        <button class="style-button-filled" type="submit" :disabled="isSubmitting">
          {{ selectedStyle ? 'Add' : 'Parse' }}
        </button>
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
      files: [],
      selectedStyle: null,
      isSubmitting: false
    };
  },
  methods: {
    ...mapActions({
      flashAlert: 'alert/flashAlert'
    }),
    parseRepository() {
      if (!this.url || this.isSubmitting) return;
      if (!this.url.includes('github.com')) {
        return this.flashAlert({ type: 'warning', message: 'Should be github.com repository' });
      }
      this.isSubmitting = true;
      axios
        .get('/api/style/files', { params: { url: this.url } })
        .then((response) => {
          this.files = response.data.files;
          this.selectedStyle = this.files[0];
        })
        .catch((error) => {
          this.flashAlert({ type: 'error', message: error.response.data.error });
        })
        .finally(() => {
          this.isSubmitting = false;
          if (this.files.length === 1) this.submitStyle();
        });
    },
    submitStyle() {
      if (this.isSubmitting || !this.selectedStyle) return;
      this.isSubmitting = true;
      axios
        .post('/api/style/add', { url: this.url, usercss: this.selectedStyle })
        .then((response) => {
          this.clear();
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
    },
    clear() {
      this.url = '';
      this.files = [];
      this.selectedStyle = null;
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

.file-list {
  margin: 1.5rem 0;
  list-style-type: none;

  li {
    padding: 0.25rem 0;

    label {
      padding-left: 0.25rem;
      cursor: pointer;
    }
  }
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
