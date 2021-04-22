<template>
  <div class="editor">
    <img
      v-if="styleData.customPreview || styleData.preview"
      :src="styleData.customPreview || styleData.preview"
      :alt="`Preview of ${styleData.customName || styleData.name} style`"
      @error="useOriginalUrl"
    />
    <img v-else class="no-image invert" src="@/images/no-image.png" alt="No preview" />
    <div class="actions">
      <div class="inputs">
        <input v-model="customFields.customName" type="text" placeholder="Custom Name" />
        Parsed name: {{ styleData.name }}
        <input v-model="customFields.customPreview" type="text" placeholder="Custom Preview URL" />
        <span v-if="styleData.preview">
          <a :href="styleData.preview" rel="noopener" target="_blank">Parsed preview</a>
        </span>
        <input v-model="customFields.customDescription" type="text" placeholder="Custom Description" />
        <span v-if="styleData.description">Parsed description: {{ styleData.description }}</span>
      </div>
      <button class="style-button mobile-wide" @click="editStyle">Update</button>
      <button class="style-button-danger mobile-wide" @click="showDeleteDialog = true">Delete</button>
    </div>
    <ConfirmationDialog
      :open="showDeleteDialog"
      :message="`Remove ${styleData.customName || styleData.name}?`"
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
      showDeleteDialog: false
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
      const { customName, customPreview, customDescription } = this.customFields;
      await this.editStyleRequest({
        _id: this.styleData._id,
        customName,
        customPreview,
        customDescription
      });
      this.$emit('fetch');
    },
    async deleteStyle() {
      await this.deleteStyleRequest(this.styleData._id);
      this.showDeleteDialog = false;
      this.$emit('fetch');
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

  img {
    max-width: 50%;
    max-height: 300px;
    object-fit: contain;
    @include media-size-tablet {
      max-width: 100%;
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
    button {
      margin-top: 0.5rem;
    }
  }
}
</style>
