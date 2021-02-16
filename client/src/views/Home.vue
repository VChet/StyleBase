<template>
  <main class="Home">
    <div class="container">
      <section class="features">
        <div class="feature-item">
          <div>Automatic Updates</div>
          <span>Install once and receive updates automatically</span>
        </div>
        <div class="feature-item">
          <div>Easy to Share</div>
          <span>You only need a link to the style repository</span>
        </div>
        <div class="feature-item">
          <div>Easy to Contribute</div>
          <span>Send feedback directly to the style's author</span>
        </div>
      </section>
      <section class="search-container">
        <label for="search" class="visually-hidden">Style search</label>
        <input id="search" v-model="searchQuery" type="text" placeholder="Search by style name or owner..." />
        <span v-show="searchQuery.length && searchQuery.length < 3" class="query-length">at least 3 characters</span>
        <CloseButton v-show="searchQuery" aria-label="Clear the search input" @click="clearSearch" />
      </section>
      <section class="main-container">
        <div class="section-header">
          <div class="title">
            Styles
            <span v-if="state.ownerFilter">
              by {{ state.ownerFilter }}
              <CloseButton aria-label="Clear the owner filter" @click="clearFilters" />
            </span>
          </div>
          <hr />
          <ul class="sort-options">
            <li v-for="(option, index) in state.sortOptions" :key="index">
              <button
                class="link"
                type="button"
                :class="{ active: state.sortOrder === option.id }"
                :disabled="state.isLoading"
                @click="setSortOrder(option.id)"
              >
                {{ option.text }}
              </button>
            </li>
          </ul>
        </div>
        <div v-if="state.isLoading || state.styles.length" class="style-grid">
          <template v-if="state.styles.length">
            <StyleCard v-for="style in state.styles" :key="style._id" :style-data="style" />
          </template>
          <template v-if="state.isLoading">
            <StyleCardSkeleton v-for="i in 8" :key="i" />
          </template>
        </div>
        <div v-else class="no-results">No results</div>
      </section>
    </div>

    <StyleInfoDialog :open="state.showStyleInfoModal" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import StyleCard from '@/components/StyleCard';
import StyleInfoDialog from '@/components/dialogs/StyleInfoDialog';
import CloseButton from '@/components/CloseButton.vue';
import StyleCardSkeleton from '@/components/StyleCardSkeleton';

function throttle(callback, limit) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

export default {
  name: 'Home',
  components: {
    StyleCard,
    StyleInfoDialog,
    CloseButton,
    StyleCardSkeleton
  },
  data() {
    return {
      timeout: setTimeout(() => {}, 0)
    };
  },
  computed: {
    ...mapGetters({
      state: 'styleGrid/getState'
    }),
    searchQuery: {
      get: function () {
        return this.state.searchQuery;
      },
      set: function (query) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.setQuery(query);
        }, 500);
      }
    }
  },
  created() {
    const { query, username, styleId } = this.$route.params;
    if (query) return this.setQuery(query);
    if (username) return this.setOwnerFilter(username);
    if (styleId) this.getStyle({ styleId });
    this.getStyles().then(() => {
      window.addEventListener('scroll', throttle(this.infiniteScroll, 200));
    });
  },
  destroyed() {
    window.removeEventListener('scroll', throttle(this.infiniteScroll, 200));
  },
  methods: {
    ...mapActions({
      getStyles: 'styleGrid/getStyles',
      getStyle: 'styleGrid/getStyle',
      selectStyle: 'styleGrid/selectStyle',
      setPage: 'styleGrid/setPage',
      setSortOrder: 'styleGrid/setSortOrder',
      setQuery: 'styleGrid/setQuery',
      setOwnerFilter: 'styleGrid/setOwnerFilter',
      resetFilters: 'styleGrid/resetFilters'
    }),
    clearFilters() {
      clearTimeout(this.timeout);
      this.resetFilters();
    },
    clearSearch() {
      clearTimeout(this.timeout);
      this.setQuery('');
    },
    infiniteScroll() {
      const scrollTrigger = document.documentElement.scrollTop + window.innerHeight * 1.25;
      const gridBottom = document.documentElement.offsetHeight;
      if (scrollTrigger >= gridBottom && this.state.pagination.hasNextPage && !this.state.isLoading) {
        this.setPage(this.state.pagination.page + 1);
      }
    }
  }
};
</script>

<style scoped lang="scss">
main {
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
  background-color: var(--color-text-bg);
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
      border-left: 1px solid var(--color-border);
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
  .query-length {
    position: absolute;
    top: 50%;
    right: 3rem;
    transform: translateY(-50%);
    user-select: none;
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
    @include media-size-mobile {
      margin-bottom: 1rem;
    }

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
    display: flex;
    margin: 0;
    gap: 0 1.5rem;
    margin-left: auto;
    list-style-type: none;
    list-style-image: none;
    @include media-size-mobile {
      margin-left: unset;
    }

    li {
      button {
        padding-bottom: 0.25rem;
        margin-bottom: -0.25rem;
        border-bottom: 2px solid transparent;
        border-radius: 0;
        outline: 0;
        font-size: 1rem;
        text-transform: lowercase;
        transition: color 0.2s, border-color 0.2s;
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
