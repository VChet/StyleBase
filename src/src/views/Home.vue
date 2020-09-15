<template>
  <main class="Home">
    <section class="features">
      <div class="feature-item">
        <div>Automatic Updates</div>
        <span>Install once and receive updates automatically</span>
      </div>
      <div class="feature-item">
        <div>Free to Share</div>
        <span>Anyone can add own style</span>
      </div>
      <div class="feature-item">
        <div>Open Source</div>
        <span>Install directly from repository</span>
      </div>
    </section>
    <section class="search-container">
      <label for="search" class="visually-hidden">Style search</label>
      <input id="search" v-model="input" type="text" placeholder="Search by style or owner name..." />
      <close-button v-show="searchQuery" @click="resetSearch" />
    </section>
    <section class="main-container">
      <div class="section-header">
        <div class="title">Styles</div>
        <hr />
        <ul class="sort-options" v-show="!searchQuery">
          <li v-for="(option, index) in sortOptions" :key="index">
            <button
              type="button"
              class="link"
              :class="{ active: selectedOption === index }"
              @click="selectedOption = index"
            >
              {{ option }}
            </button>
          </li>
        </ul>
      </div>
      <div class="style-grid" v-if="styles.length">
        <style-card v-for="style in styles" :key="style._id" v-bind="style" @open="onOpenStyleCard" />
      </div>
      <div class="no-results" v-else>No results</div>
    </section>

    <style-info-dialog
      :open="showStyleInfoModal"
      :style-data="selectedStyle"
      @close="
        showStyleInfoModal = false;
        selectedStyle = {};
      "
    />
  </main>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import StyleCard from '@/components/StyleCard';
import StyleInfoDialog from '@/components/dialogs/StyleInfoDialog';
import CloseButton from '@/components/CloseButton.vue';

export default {
  name: 'Home',
  components: {
    StyleCard,
    StyleInfoDialog,
    CloseButton
  },
  data() {
    return {
      styles: [],

      searchQuery: '',
      timeout: '',

      sortOptions: ['Recently added', 'Recently updated', 'Most liked'],
      selectedOption: 0,

      selectedStyle: {},
      showStyleInfoModal: false
    };
  },
  computed: {
    dateFromNow() {
      dayjs.extend(relativeTime);
      return dayjs(this.selectedStyle.lastUpdate).fromNow();
    },
    input: {
      get() {
        return this.searchQuery;
      },
      set(val) {
        this.searchQuery = val;
        if (!val.length) return this.resetSearch();
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.searchStyles(), 500);
      }
    }
  },
  watch: {
    selectedOption() {
      this.getStyles();
    },
    showStyleInfoModal(isActive) {
      const $body = document.body;
      isActive ? $body.classList.add('no-scroll') : $body.classList.remove('no-scroll');
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
  destroyed() {
    clearInterval(this.timeout);
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
    searchStyles() {
      axios
        .get(`/api/search?query=${this.searchQuery}`)
        .then(response => {
          this.styles = response.data.styles;
        })
        .catch(error => {
          console.error(error);
        });
    },
    resetSearch() {
      this.searchQuery = '';
      this.getStyles();
    },
    onOpenStyleCard(_id) {
      this.showStyleInfoModal = true;
      this.selectedStyle = this.styles.find(style => style._id === _id);
    }
  }
};
</script>

<style scoped lang="scss">
.main-container {
  margin-bottom: 3rem;
}

.features {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
  user-select: none;
  background-color: #fff;
  border: 1px solid var(--color-border);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12);

  .feature-item {
    padding: 1.5rem;

    &:not(:first-of-type) {
      border-left: 1px solid var(--color-border);
    }

    div {
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  @include media-size-tablet {
    margin: 1.5rem 0;
    border: none;
    flex-wrap: wrap;

    .feature-item {
      flex-basis: 100%;
      padding: 1rem;
      border-left: 2px solid var(--color-border);
    }
  }
}

.search-container {
  position: relative;
  display: flex;
  margin-bottom: 2rem;

  input {
    width: 100%;
    height: 40px;
    border: 2px solid var(--color-border);
    border-radius: 5px;
    font-size: 18px;
    padding-left: 18px;
    outline: 0;

    &:focus {
      border-color: var(--color-focus);
    }
  }

  .close-button {
    top: 50%;
    transform: translateY(-50%);
  }
}

.section-header {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: bold;

  hr {
    flex-grow: 1;
    height: 2px;
    margin: 0 1.5rem;
    border: none;
    background-color: var(--color-border);
  }

  .sort-options {
    margin-left: auto;
    display: flex;
    list-style-type: none;
    list-style-image: none;

    @include media-size-tablet {
      overflow: auto;
    }

    li {
      margin: 0 1rem;

      button {
        padding: 0.25rem 0;
        border-bottom: 2px solid transparent;
        border-radius: 0;
        outline: 0;
        font-size: 1rem;
        text-transform: lowercase;
        transition: color 0.2s, border-color 0.2s;
        color: var(--color-text);

        &.active {
          color: var(--color-main);
          border-color: var(--color-main);
        }

        &:focus {
          color: var(--color-main);
          border-color: var(--color-focus);
        }
      }
    }
  }
}

.style-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -2rem;
}

.no-results {
  text-align: center;
  font-size: 1.5rem;
}
</style>
