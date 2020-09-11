<template>
  <main class="Home">
    <ul class="sort-options">
      <li>
        <button class="link" :class="{ active: selectedOption === 0 }" @click="selectedOption = 0">
          Recently added
        </button>
      </li>
      <li>
        <button class="link" :class="{ active: selectedOption === 1 }" @click="selectedOption = 1">
          Recently updated
        </button>
      </li>
      <li>
        <button class="link" :class="{ active: selectedOption === 2 }" @click="selectedOption = 2">Most liked</button>
      </li>
    </ul>
    <section class="main-container">
      <div class="section-header">{{ sortOptions[selectedOption] }} styles</div>
      <div class="style-grid">
        <style-card v-for="style in styles" :key="style._id" v-bind="style" @open="onOpenStyleCard" />
      </div>
    </section>

    <base-dialog
      size="extra-large"
      :open="showStyleInfoModal"
      @close="
        showStyleInfoModal = false;
        selectedStyle = {};
      "
    >
      <template #body>
        <div :style="{ width: '100%', maxWidth: '100%' }">
          <div class="style-info-header">
            <div class="style-info-title">
              {{ selectedStyle.name }}
              <span class="owner">
                <!-- TODO: add styles grid filtered by owner handler -->
                by <button class="link">{{ selectedStyle.owner }}</button>
              </span>
            </div>
            <div class="style-info-date">Updated: {{ dateFromNow }}</div>
          </div>

          <div class="style-info-description">{{ selectedStyle.description }}</div>

          <div class="style-info-image">
            <img v-if="selectedStyle.preview" :style="{ maxWidth: '100%' }" :src="selectedStyle.preview" />
            <div v-else :style="{ backgroundColor: '#C0CCDA', height: '500px' }"></div>
            <div class="style-licence">{{ selectedStyle.license }}</div>
          </div>

          <div class="style-info-content">
            <ul>
              <li>
                <a :href="selectedStyle.url" rel="noopener" target="_blank"> {{ selectedStyle.stargazers }} stars </a>
              </li>
              <li>
                <a :href="`${selectedStyle.url}/forks`" rel="noopener" target="_blank">
                  {{ selectedStyle.forks }} forks
                </a>
              </li>
              <li>
                <a :href="`${selectedStyle.url}/issues`" rel="noopener" target="_blank">
                  {{ selectedStyle.issues }} issues
                </a>
              </li>
              <li>
                <a :href="selectedStyle.url" rel="noopener" target="_blank"> {{ selectedStyle.watchers }} watchers </a>
              </li>
              <li class="buttons">
                <a class="button style-button-filled" :href="selectedStyle.usercss" rel="noopener" target="_blank">
                  Install
                </a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </base-dialog>
  </main>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import StyleCard from '@/components/StyleCard';
import BaseDialog from '@/components/BaseDialog';

export default {
  name: 'Home',
  components: {
    StyleCard,
    BaseDialog
  },
  data() {
    return {
      sortOptions: ['Recently added', 'Recently updated', 'Most liked'],
      selectedOption: 0,
      styles: [],
      selectedStyle: {},

      showStyleInfoModal: false
    };
  },
  computed: {
    dateFromNow() {
      dayjs.extend(relativeTime);
      return dayjs(this.selectedStyle.lastUpdate).fromNow();
    }
  },
  watch: {
    selectedOption() {
      this.getStyles();
    }
  },
  created() {
    axios
      .get('/api/styles')
      .then(response => {
        this.styles = response.data.styles;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    getStyles() {
      let params;
      switch (this.selectedOption) {
        case 1:
          params = { sort: 'update' };
          break;
        case 2:
          params = { sort: 'stars' };
          break;
        default:
          params = {};
          break;
      }
      axios
        .get('/api/styles', { params })
        .then(response => {
          this.styles = response.data.styles;
        })
        .catch(error => {
          console.error(error);
        });
    },
    onOpenStyleCard(_id) {
      this.showStyleInfoModal = true;

      axios
        .get(`/api/style/${_id}`)
        .then(styleData => {
          this.selectedStyle = styleData.data.style;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/mixins/media.scss';

.main-container {
  margin-bottom: 1rem;
}

.sort-options {
  display: flex;
  list-style-type: none;
  list-style-image: none;

  @include media-size-tablet {
    overflow: auto;
  }

  li {
    margin: 0.5rem;

    &:first-child {
      margin-left: auto;

      @include media-size-tablet {
        margin-left: unset;
      }
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      transition: color 0.2s;
    }

    button.active {
      background-color: #d37b53;
      outline-color: #ad552c;
      color: #fff;
    }
  }
}

.section-header {
  display: flex;
  align-items: center;
  background-color: #f5e6cc;
  height: 38px;
  font-size: 22px;
  padding-left: 0.5rem;
  margin-bottom: 2rem;
}

.style-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -2rem;
}

.style-info-header {
  display: flex;
  align-items: center;
  background-color: #f5e6cc;
  margin-bottom: 1rem;
  padding: 1rem;

  .style-info-title {
    font-size: 30px;
    font-weight: bold;
    line-height: 1;

    .owner {
      font-size: 1rem;
      font-weight: normal;

      button {
        font-size: initial;
        color: #d37b53;

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
    border-radius: 4px;
  }

  .style-licence {
    position: absolute;
    top: 2rem;
    right: 0;
    padding: 0.5rem 1rem;
    background-color: #f5e6cc;
    font-size: 20px;
    transition: opacity 0.4s;
  }

  &:hover {
    .style-licence {
      opacity: 0;
    }
  }
}

.style-info-content {
  margin-bottom: 2rem;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;

    li {
      &:not(.buttons) {
        a {
          font-size: 24px;
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
      }
    }
  }
}
</style>
