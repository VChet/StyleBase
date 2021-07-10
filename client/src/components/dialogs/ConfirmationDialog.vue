<template>
  <BaseDialog v-if="open" :has-route="false" size="small" @close="$emit('close')">
    <h1 class="dialog-title">{{ message }}</h1>
    <div class="dialog-buttons">
      <button class="style-button" type="button" :disabled="loading" @click="$emit('close')">Cancel</button>
      <button class="style-button" type="button" :disabled="loading" @click="$emit('confirm')">Proceed</button>
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog.vue';

export default {
  name: 'ConfirmationDialog',
  components: {
    BaseDialog
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    message: {
      type: String,
      default: 'Perform an action?'
    },
    loading: {
      type: Boolean,
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

.dialog-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
