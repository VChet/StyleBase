<template>
  <BaseDialog v-if="open" size="extra-large" @close="closeStyleModal">
    <div class="header">
      <div class="title">
        <a :href="`${styleData.url}`" rel="noopener" target="_blank">
          {{ styleData.customName || removeDashes(styleData.name) }}
        </a>
        <span class="owner">
          by
          <button class="link" type="button" @click="setOwnerFilter(styleData.owner)">
            {{ styleData.owner }}
          </button>
        </span>
      </div>
      <div class="last-update">Updated {{ dateFromNow(styleData.lastUpdate) }}</div>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="description" v-html="parseEmoji(styleData.customDescription || styleData.description)"></div>

    <ul v-if="styleData.topics.length" class="topics">
      <li v-for="topic in styleData.topics" :key="topic">
        <button type="button" @click="setQuery(topic)">{{ topic }}</button>
      </li>
    </ul>

    <div class="share">
      <a class="twitter" :href="twitterLink" rel="noopener" target="_blank">Share on Twitter</a>
    </div>

    <div class="image">
      <img
        v-if="styleData.customPreview || styleData.preview"
        :src="styleData.customPreview || styleData.preview"
        :alt="`Preview of ${styleData.customName || styleData.name} style`"
      />
      <img v-else class="no-image" src="@/images/no-image.png" alt="No preview" />
      <div v-if="styleData.license" class="style-license">{{ styleData.license }}</div>
    </div>

    <div class="content">
      <ul>
        <li>
          <a :href="`${styleData.url}/stargazers`" rel="noopener" target="_blank">
            {{ pluralize(styleData.stargazers, 'star') }}
          </a>
        </li>
        <li>
          <a :href="`${styleData.url}/network/members`" rel="noopener" target="_blank">
            {{ pluralize(styleData.forks, 'fork') }}
          </a>
        </li>
        <li>
          <a :href="`${styleData.url}/issues`" rel="noopener" target="_blank">
            {{ pluralize(styleData.issues, 'issue') }}
          </a>
        </li>
        <li>
          <a :href="`${styleData.url}/watchers`" rel="noopener" target="_blank">
            {{ pluralize(styleData.watchers, 'watcher') }}
          </a>
        </li>
        <li class="buttons">
          <a class="button style-button-filled mobile-wide" :href="styleData.usercss" rel="noopener" target="_blank"
            >Install</a
          >
        </li>
      </ul>
    </div>

    <div v-if="isAuthorized" class="actions">
      <div class="action-group">
        <strong class="action-title">Edit style</strong>
        <form @submit.prevent="editStyle">
          <input
            :value="styleData.customName"
            type="text"
            placeholder="Style name"
            @change="(e) => (customName = e.target.value)"
          />
          <input
            :value="styleData.customPreview"
            type="text"
            placeholder="Preview url"
            @change="(e) => (customPreview = e.target.value)"
          />
          <input
            :value="styleData.customDescription"
            type="text"
            placeholder="Style description"
            @change="(e) => (customDescription = e.target.value)"
          />
          <button class="style-button" type="submit">Edit</button>
        </form>
      </div>
      <div class="action-group">
        <strong class="action-title">Delete style</strong>
        <form @submit.prevent="showDeleteDialog = true">
          <span>
            Keep in&nbsp;mind that it&nbsp;still can be&nbsp;re&#8209;added. If&nbsp;you don't want your style
            on&nbsp;this site&nbsp;&mdash; please
            <a href="mailto:feedback@stylebase.cc" rel="noopener">contact us</a>.
          </span>
          <button class="style-button-danger" type="submit">Delete</button>
        </form>
      </div>
    </div>

    <ConfirmationDialog
      :open="showDeleteDialog"
      message="Remove this style?"
      @confirm="deleteStyle"
      @close="showDeleteDialog = false"
    />
  </BaseDialog>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

import { styleInfoMixin } from '@/mixins';

import BaseDialog from '@/components/dialogs/BaseDialog';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';

export default {
  name: 'StyleInfoDialog',
  components: {
    BaseDialog,
    ConfirmationDialog
  },
  mixins: [styleInfoMixin],
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      customName: '',
      customPreview: '',
      customDescription: '',
      showDeleteDialog: false
    };
  },
  computed: {
    ...mapGetters({
      styleData: 'styleGrid/getSelectedStyle',
      user: 'user/getUser'
    }),
    isAuthorized() {
      if (!Object.keys(this.user).length) return false;
      const isAdmin = this.user.role === 'Admin';
      const isOwner = this.styleData.owner === this.user.username;
      const userOrgs = this.user.orgs.map((org) => org.name);
      const isMember = userOrgs.includes(this.styleData.owner);
      return isAdmin || isOwner || isMember;
    },
    twitterLink() {
      const name = this.styleData.customName || this.styleData.name;
      const link = `https://stylebase.cc/${this.styleData.owner}/${this.styleData.name}`;
      const text = encodeURIComponent(`${name} by ${this.styleData.owner}.\n${link}`);
      return `https://twitter.com/intent/tweet?text=${text}`;
    }
  },
  methods: {
    ...mapActions({
      getStyles: 'styleGrid/getStyles',
      setOwnerFilter: 'styleGrid/setOwnerFilter',
      setQuery: 'styleGrid/setQuery',
      closeStyleModal: 'styleGrid/closeStyleModal',
      flashAlert: 'alert/flashAlert'
    }),
    editStyle() {
      axios
        .put('/api/style/edit', {
          _id: this.styleData._id,
          customName: this.customName,
          customPreview: this.customPreview,
          customDescription: this.customDescription
        })
        .then((response) => {
          const name = response.data.style.customName || response.data.style.name;
          this.flashAlert({ type: 'success', message: `"${name}" style updated` });
          this.getStyles();
          this.closeStyleModal();
        })
        .catch((error) => {
          this.flashAlert({ type: 'error', message: error.response.data.error });
        })
        .finally(() => {
          this.$gtag.event('edit style request', { event_category: 'style info dialog' });
        });
    },
    deleteStyle() {
      axios
        .delete('/api/style/delete', { data: { _id: this.styleData._id } })
        .then((response) => {
          const name = response.data.style.customName || response.data.style.name;
          this.flashAlert({ type: 'success', message: `"${name}" style deleted` });
          this.getStyles();
          this.closeStyleModal();
        })
        .catch((error) => {
          this.flashAlert({ type: 'error', message: error.response.data.error });
        })
        .finally(() => {
          this.showDeleteDialog = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;

  .title {
    font-size: 30px;
    font-weight: bold;
    line-height: 1;

    .owner {
      font-size: 1rem;
      font-weight: normal;
      white-space: nowrap;

      button {
        font-size: initial;
        color: var(--color-main);

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .last-update {
    margin-left: auto;
    white-space: nowrap;
    font-size: 1.25rem;

    @include media-size-tablet {
      margin: 1rem 0 0;
      font-size: initial;
    }
  }

  @include media-size-tablet {
    flex-direction: column;
  }
}

.description {
  margin: 1rem 0;
  font-size: 1.25rem;
  @include media-size-tablet {
    font-size: initial;
  }
}

.topics {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  list-style: none;

  li {
    button {
      padding: 0.5rem;
      background-color: #fff;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      white-space: nowrap;
      transition: border-color 0.3s;

      &:hover {
        border-color: var(--color-main-dark);
      }
    }
  }
}

.share {
  margin: 1rem 0;

  a {
    color: var(--color-main);
    &:hover {
      text-decoration: underline;
    }
  }
}

.image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  .style-license {
    position: absolute;
    top: 2rem;
    right: 0;
    padding: 0.5rem 1rem;
    background-color: var(--color-border);
    border-radius: 2px 0 0 2px;
    font-size: 20px;
    transition: opacity 0.4s;
  }

  &:hover {
    .style-license {
      opacity: 0;
    }
  }
}

.content {
  ul {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    list-style: none;

    li {
      margin: 1rem;

      @include media-size-tablet {
        margin: 0.5rem;
      }

      &:not(.buttons) {
        a {
          font-size: 1.75rem;

          @include media-size-tablet {
            font-size: 1.5rem;
          }
        }
      }

      &.buttons {
        a {
          margin-right: 1rem;
        }

        a:last-child {
          margin-right: 0;
        }

        @include media-size-tablet {
          text-align: center;
          flex-basis: 100%;
        }
      }
    }
  }
}

.action-group {
  margin: 1.5rem 0;
  border-top: 1px solid var(--color-border);

  .action-title {
    font-size: 20px;
    display: inline-block;
    margin: 1rem 0 0.5rem;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.5rem 0;
  }

  input {
    flex: 1;
    box-sizing: border-box;
    height: 50px;
    padding: 0 15px;
  }

  a {
    color: var(--color-main);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>