<template>
  <base-dialog v-if="open" size="small" @close="$emit('close')">
    <div class="dialog-title">{{ message }}</div>
    <div class="dialog-buttons">
      <button class="style-button" type="button" @click="$emit('close')">Cancel</button>
      <button class="style-button" type="button" @click="$emit('confirm')">Proceed</button>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog';

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
