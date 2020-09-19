<template>
  <base-dialog v-if="open" size="small" @close="$emit('close')">
    <template>
      <div class="dialog-title">Here comes another style...</div>

      <div class="dialog-input">
        <input v-model="url" type="text" placeholder="Link to repository" />
        <div class="error" v-if="error">{{ error }}</div>
      </div>

      <div class="dialog-buttons">
        <button class="style-button" @click="$emit('close')">Not now</button>
        <button class="style-button-filled" @click="submitStyle">Add</button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import axios from 'axios';
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
      url: '',
      isSubmitting: false,
      error: ''
    };
  },
  methods: {
    submitStyle() {
      if (!this.url.includes('github.com')) return (this.error = 'Should be github.com repository');
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      axios
        .post('/api/style/add', {
          url: this.url
        })
        .then(response => {
          console.log(response);
          this.url = '';
          this.$emit('close');
        })
        .catch(error => {
          this.error = error.response.data.error;
        })
        .finally(() => {
          this.isSubmitting = false;
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
  text-align: center;
  margin-bottom: 1.5rem;

  input {
    height: 50px;
    width: 264px;
    font-size: 18px;
    padding: 0 15px 0 15px;
  }

  .error {
    margin: 1rem 0;
    color: red;
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
