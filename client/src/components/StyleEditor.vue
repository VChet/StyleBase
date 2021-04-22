<template>
  <div class="editor">
    <div class="image">
      <img
        v-if="styleData.customPreview || styleData.preview"
        :src="styleData.customPreview || styleData.preview"
        :alt="`Preview of ${styleData.customName || styleData.name} style`"
        @error="useOriginalUrl"
      />
      <img v-else class="no-image invert" src="@/images/no-image.png" alt="No preview" />
    </div>
    <div class="actions">
      <div class="inputs">
        <input v-model="customFields.customName" type="text" placeholder="Custom Name" />
        Parsed name: {{ styleData.name }}
        <input v-model="customFields.customPreview" type="text" placeholder="Custom Preview URL" />
        <span v-if="styleData.preview">
          Parsed preview: <a :href="styleData.preview" rel="noopener" target="_blank">URL</a>
        </span>
        <input v-model="customFields.customDescription" type="text" placeholder="Custom Description" />
        <span v-if="styleData.description">Parsed description: {{ styleData.description }}</span>
      </div>
      <div class="buttons">
        <button class="style-button mobile-wide" :disabled="updating" @click="editStyle">Update</button>
        <button class="style-button-danger mobile-wide" :disabled="updating" @click="showDeleteDialog = true">
          Delete
        </button>
      </div>
    </div>
    <ConfirmationDialog
      :open="showDeleteDialog"
      :message="`Remove ${styleData.customName || styleData.name}?`"
      :loading="updating"
      @confirm="deleteStyle"
      @close="showDeleteDialog = false"
    />
  </div>
</template>

<script>
import styleInfo from '@/mixins';
import { mapActions } from 'vuex';

import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';

export default {
  name: 'StyleEditor',
  components: {
    ConfirmationDialog
  },
  mixins: [styleInfo],
  props: {
    styleData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      customFields: { ...this.styleData },
      showDeleteDialog: false,
      updating: false
    };
  },
  methods: {
    ...mapActions({
      editStyleRequest: 'styleGrid/editStyle',
      deleteStyleRequest: 'styleGrid/deleteStyle'
    }),
    useOriginalUrl(e) {
      e.target.src = this.styleData.customPreview || this.styleData.preview;
    },
    async editStyle() {
      this.updating = true;
      const { customName, customPreview, customDescription } = this.customFields;
      await this.editStyleRequest({
        _id: this.styleData._id,
        customName,
        customPreview,
        customDescription
      });
      this.$emit('fetch');
      this.updating = false;
    },
    async deleteStyle() {
      this.updating = true;
      await this.deleteStyleRequest(this.styleData._id);
      this.showDeleteDialog = false;
      this.$emit('fetch');
      this.updating = false;
    }
  }
};
</script>

<style scoped lang="scss">
.editor {
  display: flex;
  justify-content: center;
  gap: 1rem;
  @include media-size-tablet {
    flex-wrap: wrap;
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    max-height: 300px;
    @include media-size-tablet {
      width: 100%;
    }
    img {
      max-width: 100%;
      max-height: inherit;
    }
  }

  .actions {
    flex: 1;
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      input {
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        padding: 0 15px;
      }
      a {
        text-decoration: underline;
      }
    }
    .buttons {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem 1rem;
      @include media-size-mobile {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
