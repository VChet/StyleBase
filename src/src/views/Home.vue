<template>
  <section class="Home">
    <ul class="sort-options">
      <li>
        <button :class="{ active: selectedOption === 0 }" @click="selectedOption = 0">Recently added</button>
      </li>
      <li>
        <button :class="{ active: selectedOption === 1 }" @click="selectedOption = 1">Recently updated</button>
      </li>
      <li>
        <button :class="{ active: selectedOption === 2 }" @click="selectedOption = 2">Most liked</button>
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
                by <button>{{ selectedStyle.owner }}</button>
              </span>
            </div>
            <div class="style-info-date">Updated: {{ selectedStyle.lastUpdate | dateFromNow }}</div>
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
                <a class="style-button-filled" :href="selectedStyle.usercss" rel="noopener" target="_blank">
                  Install
                </a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </base-dialog>
  </section>
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
  watch: {
    selectedOption: function() {
      this.getStyles();
    }
  },
  filters: {
    dateFromNow: function(timestamp) {
      dayjs.extend(relativeTime);
      return dayjs(timestamp).fromNow();
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

  li {
    margin: 0.5rem;
  }

  li:first-child {
    margin-left: auto;

    @include media-size-tablet {
      margin-left: unset;
    }
  }

  li button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: transparent;
    border-radius: 4px;
    font-size: 1.25rem;
    transition: color 0.2s;
  }

  li button:hover {
    color: lightsalmon;
  }

  li button.active {
    background-color: #272727;
    color: #fff;
  }

  @include media-size-tablet {
    overflow: auto;
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

    button {
      padding: 0;
      border: none;
      font-size: initial;
      background-color: transparent;
      color: #d37b53;
      transition: color 0.2s;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .style-info-title {
    font-size: 34px;
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
          text-decoration: none;
          font-size: 24px;
          transition: color 0.2s;

          &:hover {
            color: #d37b53;
          }
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
