<template>
  <base-dialog v-if="open" size="extra-large" @close="$emit('close')">
    <template>
      <div class="style-info-header">
        <div class="style-info-title">
          <a :href="`${styleData.url}`" rel="noopener" target="_blank">
            {{ removeDashes(styleData.name) }}
          </a>
          <span class="owner">
            by
            <button class="link" type="button" @click="$emit('search-by-owner', styleData.owner)">
              {{ styleData.owner }}
            </button>
          </span>
        </div>
        <div class="style-info-date">Updated {{ dateFromNow(styleData.lastUpdate) }}</div>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="style-info-description" v-html="parseEmoji(styleData.description)"></div>

      <div class="style-info-image">
        <img v-if="styleData.preview" :src="styleData.preview" />
        <div v-else class="no-image">No preview</div>
        <div v-if="styleData.license" class="style-license">{{ styleData.license }}</div>
      </div>

      <div class="style-info-content">
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
            <a class="button style-button-filled" :href="styleData.usercss" rel="noopener" target="_blank">Install</a>
          </li>
        </ul>
      </div>
    </template>
  </base-dialog>
</template>

<script>
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
    }
  }
};
</script>

<style scoped lang="scss">
.style-info-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  .style-info-title {
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

  .style-info-date {
    font-size: 20px;
    margin-left: auto;
  }
}

.style-info-description {
  margin: 1rem 0;
  font-size: 20px;
}

.style-info-image {
  position: relative;

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  .no-image {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5e6cc;
    opacity: 0.6;
    user-select: none;
    font-size: 2rem;
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

.style-info-content {
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
        }
      }

      &.buttons {
        a {
          margin-right: 1rem;
          width: 175px;
          height: 50px;
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
