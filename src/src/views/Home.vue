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
      <input
        id="search"
        v-model.lazy="searchQuery"
        v-debounce="500"
        type="text"
        placeholder="Search by style or owner name..."
        @change="searchStyles"
      />
      <close-button v-show="searchQuery" @click="resetFilters" />
    </section>
    <section class="main-container">
      <div class="section-header">
        <div class="title">
          Styles
          <span v-if="ownerFilter">
            by {{ ownerFilter }}
            <close-button @click="resetFilters" />
          </span>
        </div>
        <hr />
        <ul v-show="!searchQuery && !ownerFilter" class="sort-options">
          <li v-for="(option, index) in sortOptions" :key="index">
            <button
              class="link"
              type="button"
              :class="{ active: selectedOption === index }"
              @click="selectedOption = index"
            >
              {{ option }}
            </button>
          </li>
        </ul>
      </div>
      <div v-if="styles.length" class="style-grid">
        <style-card v-for="style in styles" :key="style._id" v-bind="style" @open="onOpenStyleCard" />
      </div>
      <div v-else class="no-results">No results</div>
    </section>

    <style-info-dialog
      :open="showStyleInfoModal"
      :style-data="selectedStyle"
      @search-by-owner="(value) => (ownerFilter = value)"
      @close="closeStyleModal"
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
import debounce from '@/directives/debounce';

export default {
  name: 'Home',
  components: {
    StyleCard,
    StyleInfoDialog,
    CloseButton
  },
  directives: {
    debounce
  },
  data() {
    return {
      styles: [],
      isLoading: true,
      pagination: {
        page: 1,
        hasNextPage: false
      },

      searchQuery: '',
      ownerFilter: '',

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
    }
  },
  watch: {
    selectedOption() {
      this.getStyles();
    },
    ownerFilter(filter) {
      this.closeStyleModal();
      if (filter) this.searchByOwner();
    },
    showStyleInfoModal(isActive) {
      const $body = document.body;
      isActive ? $body.classList.add('no-scroll') : $body.classList.remove('no-scroll');
    }
  },
  created() {
    axios
      .get('/api/styles')
      .then((response) => {
        this.styles = response.data.styles;
        this.pagination = {
          page: response.data.page,
          hasNextPage: response.data.hasNextPage
        };

        window.addEventListener('scroll', this.infiniteScroll);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  destroyed() {
    window.removeEventListener('scroll', this.infiniteScroll);
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

      this.isLoading = true;
      axios
        .get('/api/styles', { params })
        .then((response) => {
          this.styles = response.data.styles;
          this.pagination = {
            page: response.data.page,
            hasNextPage: response.data.hasNextPage
          };
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    searchStyles() {
      if (this.searchQuery) {
        axios
          .get(`/api/search?query=${this.searchQuery}`)
          .then((response) => {
            this.styles = response.data.styles;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.resetFilters();
      }
    },
    searchByOwner() {
      axios
        .get(`/api/owner/${this.ownerFilter}`)
        .then((response) => {
          this.styles = response.data.styles;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resetFilters() {
      this.searchQuery = '';
      this.ownerFilter = '';
      this.pagination.page = 1;
      this.getStyles();
    },
    getMoreStyles() {
      let URL = `/api/styles/${this.pagination.page}`;
      if (this.searchQuery) {
        URL = `/api/search/${this.pagination.page}?query=${this.searchQuery}`;
      }
      if (this.ownerFilter) {
        URL = `/api/owner/${this.ownerFilter}/${this.pagination.page}`;
      }

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

      this.isLoading = true;
      axios
        .get(URL, { params })
        .then((response) => {
          this.styles = this.styles.concat(response.data.styles);
          this.pagination = {
            page: response.data.page,
            hasNextPage: response.data.hasNextPage
          };
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onOpenStyleCard(_id) {
      this.showStyleInfoModal = true;
      this.selectedStyle = this.styles.find((style) => style._id === _id);
    },
    closeStyleModal() {
      this.showStyleInfoModal = false;
      this.selectedStyle = {};
    },
    infiniteScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight &&
        this.pagination.hasNextPage &&
        !this.isLoading
      ) {
        this.pagination.page++;
        this.getMoreStyles();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.Home {
  flex: 1;
}

.main-container {
  margin-bottom: 3rem;
}

.features {
  display: flex;
  width: 100%;
  margin: 2rem 0;
  user-select: none;
  background-color: #fff;
  border: 1px solid var(--color-border);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12);

  .feature-item {
    flex: 1;
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
    font-size: 18px;
    padding-left: 18px;
  }

  .close-button {
    top: 50%;
    transform: translateY(-50%);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  @include media-size-mobile {
    flex-direction: column;
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;

    .close-button {
      top: unset;
      right: unset;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  font-size: 1.5rem;
}
</style>
