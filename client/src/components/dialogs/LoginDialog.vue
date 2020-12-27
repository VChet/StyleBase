<template>
  <BaseDialog v-if="open" size="small" @close="$emit('close')">
    <h1 class="dialog-title">Login</h1>
    <div class="login-buttons">
      <a class="button style-button mobile-wide" href="/login/github">
        <img class="icon" src="@/images/github-logo.png" alt="GitHub logo" />
        GitHub
      </a>
      <a class="button style-button mobile-wide" href="/login/codeberg">
        <img class="icon" src="@/images/codeberg-logo.png" alt="Codeberg logo" />
        Codeberg
      </a>
    </div>
    <p>
      The authorization will allow you to edit styles that belong to you or your organization. We store only your
      username, id, and your public organizations.
    </p>
    <div class="dialog-buttons">
      <button class="style-button-filled" type="button" @click="$emit('close')">Close</button>
    </div>
  </BaseDialog>
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

.login-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;

  @include media-size-mobile {
    flex-direction: column;
  }
}

.dialog-buttons {
  margin-top: 1.5rem;
  text-align: center;
}
</style>
