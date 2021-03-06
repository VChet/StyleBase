<template>
  <main class="Home">
    <div class="container">
      <section class="search-container">
        <label for="search" class="visually-hidden">Style search</label>
        <input id="search" v-model="searchQuery" type="text" placeholder="Search by style name or owner..." />
        <span v-show="searchQuery.length && searchQuery.length < 3" class="query-length">at least 3 characters</span>
        <CloseButton v-show="searchQuery" aria-label="Clear the search input" @click="clearSearch" />
      </section>
      <TopicCloud v-if="!state.searchQuery && !state.ownerFilter" class="topics" />
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

    <transition name="transition-dialog">
      <router-view />
    </transition>
    <transition name="transition-dialog">
      <StyleInfoDialog v-if="state.showStyleInfoModal" />
    </transition>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import StyleCard from '@/components/cards/StyleCard.vue';
import StyleCardSkeleton from '@/components/cards/StyleCardSkeleton.vue';
import StyleInfoDialog from '@/components/dialogs/StyleInfoDialog.vue';
import CloseButton from '@/components/CloseButton.vue';
import TopicCloud from '@/components/TopicCloud.vue';

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
    TopicCloud,
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
    window.addEventListener('scroll', throttle(this.infiniteScroll, 100));
  },
  destroyed() {
    window.removeEventListener('scroll', throttle(this.infiniteScroll, 100));
  },
  methods: {
    ...mapActions({
      setPage: 'styleGrid/setPage',
      setSortOrder: 'styleGrid/setSortOrder',
      setQuery: 'styleGrid/setQuery',
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
  margin: 1rem 0 3rem;
}

.search-container {
  position: relative;
  display: flex;
  margin-bottom: 1rem;

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
