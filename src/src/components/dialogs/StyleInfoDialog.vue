<template>
  <base-dialog v-if="open" size="extra-large" @close="$emit('close')">
    <template>
      <div class="header">
        <div class="title">
          <a :href="`${styleData.url}`" rel="noopener" target="_blank">
            {{ styleData.customName || removeDashes(styleData.name) }}
          </a>
          <span class="owner">
            by
            <button class="link" type="button" @click="$emit('search-by-owner', styleData.owner)">
              {{ styleData.owner }}
            </button>
          </span>
        </div>
        <div class="last-update">Updated {{ dateFromNow(styleData.lastUpdate) }}</div>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="description" v-html="parseEmoji(styleData.description)"></div>

      <ul v-if="styleData.topics.length" class="topics">
        <li v-for="topic in styleData.topics" :key="topic">
          <button @click="$emit('search-topic', topic)">{{ topic }}</button>
        </li>
      </ul>

      <div v-if="authorizedUser" class="edit">
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
        <button class="style-button" @click="editStyle">Edit</button>
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
    </template>
  </base-dialog>
</template>

<script>
import axios from 'axios';

import { styleInfoMixin } from '@/mixins';

import BaseDialog from '@/components/dialogs/BaseDialog';

export default {
  name: 'StyleInfoDialog',
  components: {
    BaseDialog
  },
  mixins: [styleInfoMixin],
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    styleData: {
      type: Object,
      required: true,
      default: () => {}
    },
    user: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      authorizedUser: false,
      customName: this.styleData.customName,
      customPreview: this.styleData.customPreview
    };
  },
  watch: {
    styleData() {
      this.checkAuthorization();
    },
    user() {
      this.checkAuthorization();
    }
  },
  methods: {
    checkAuthorization() {
      const isOwner = this.styleData.owner === this.user.username;
      const isAdmin = this.user.role === 'Admin';
      this.authorizedUser = isOwner || isAdmin;
    },
    editStyle() {
      axios
        .put('/api/style/edit', {
          url: this.styleData.url,
          customName: this.customName,
          customPreview: this.customPreview
        })
        .then((response) => {
          alert(`"${response.data.style.name}" style updated`);
          this.$emit('update-styles');
          this.$emit('close');
        })
        .catch((error) => {
          alert(error.response.data.error);
        })
        .finally(() => {
          this.$gtag.event('edit style request', { event_category: 'style info dialog' });
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

.edit {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem 0;

  input,
  button {
    margin: 0.5rem 0;
  }

  input {
    flex: 1;
    box-sizing: border-box;
    height: 50px;
    margin-right: 1rem;
    padding: 0 15px;
  }

  button {
    flex: 0 1 auto;
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
</style>
