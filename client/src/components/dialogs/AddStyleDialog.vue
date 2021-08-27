<template>
  <BaseDialog size="small">
    <form @submit.prevent="selectedStyle ? submitStyle() : parseRepository()">
      <h1 class="dialog-title">Add new style</h1>
      <div class="dialog-input">
        <input v-model.trim="url" type="text" placeholder="Link to repository" />
        <CloseButton v-show="url" aria-label="Clear the input" @click="clear" />
      </div>
      <p v-if="!files.length">Supported providers: GitHub, Codeberg</p>
      <div v-if="files.length">
        <h2>Choose file</h2>
        <ul class="file-list">
          <li v-for="(file, index) in files" :key="index">
            <input :id="index" v-model="selectedStyle" type="radio" :value="file" :disabled="isSubmitting" />
            <label :for="index">{{ file.name }}</label>
          </li>
        </ul>
      </div>
      <div v-if="selectedStyle">
        <h2>Add style preview</h2>
        <input v-model="customPreview" type="text" placeholder="Enter preview URL" />
        <p>If preview is not specified, it will be taken automatically from the repository images.</p>
      </div>
      <div class="dialog-buttons">
        <button class="style-button" type="button" @click="$router.back()">Not now</button>
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

import BaseDialog from '@/components/dialogs/BaseDialog.vue';
import CloseButton from '@/components/CloseButton.vue';

export default {
  name: 'AddStyleDialog',
  components: {
    BaseDialog,
    CloseButton
  },
  data() {
    return {
      url: '',
      files: [],
      selectedStyle: null,
      customPreview: '',
      isSubmitting: false
    };
  },
  methods: {
    ...mapActions({
      getStyles: 'styleGrid/getStyles',
      getUserStyles: 'user/getUserStyles',
      flashAlert: 'alert/flashAlert'
    }),
    parseRepository() {
      if (!this.url || this.isSubmitting) return;
      if (!['github.com', 'codeberg.org'].some((url) => this.url.includes(url))) {
        return this.flashAlert({ type: 'warning', message: 'Invalid repository URL' });
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
        });
    },
    async submitStyle() {
      if (this.isSubmitting || !this.selectedStyle) return;
      this.isSubmitting = true;
      await axios
        .post('/api/style/add', {
          url: this.url,
          usercss: this.selectedStyle,
          customPreview: this.customPreview
        })
        .then((response) => {
          this.clear();
          this.flashAlert({ type: 'success', message: `"${response.data.style.name}" added successfully` });
          this.getStyles();
          this.getUserStyles();
          this.$router.back();
        })
        .catch((error) => {
          this.flashAlert({ type: 'error', message: error.response.data.error });
        });
      this.isSubmitting = false;
    },
    clear() {
      this.url = '';
      this.files = [];
      this.selectedStyle = null;
      this.customPreview = '';
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
  margin-bottom: 1rem;

  .close-button {
    width: 1.5rem;
    height: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

input[type='text'] {
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  padding: 0 15px;
}

.file-list {
  margin: 1rem 0;
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
  gap: 1rem;
  margin-top: 2rem;
}
</style>
