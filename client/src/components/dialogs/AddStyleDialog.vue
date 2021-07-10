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
        <h2>Edit style data</h2>
        <div class="custom-fields">
          <input v-model="customName" type="text" placeholder="Name" />
          <input v-model="customPreview" type="text" placeholder="Preview URL" />
          <input v-model="customDescription" type="text" placeholder="Description" />
        </div>
        <p>
          Style name, description and preview will be automatically taken from the style metadata and repository files,
          but you can enter them manually. If you are the owner of the repository you will be able to edit it later.
        </p>
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
      customName: '',
      customDescription: '',
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
          customName: this.customName,
          customDescription: this.customDescription,
          customPreview: this.customPreview
        })
        .then((response) => {
          this.clear();
          const name = response.data.style.customName || response.data.style.name;
          this.flashAlert({ type: 'success', message: `"${name}" added successfully` });
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
      this.customName = '';
      this.customDescription = '';
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

.custom-fields {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1rem 0;
  input {
    flex: 1;
    box-sizing: border-box;
    height: 50px;
    padding: 0 15px;
  }
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
