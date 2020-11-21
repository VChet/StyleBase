<template>
  <main class="Home">
    <div class="container">
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
        <input id="search" v-model="searchQuery" type="text" placeholder="Search by style name or owner..." />
        <CloseButton v-show="state.searchQuery" aria-label="Clear the search input" @click="reset" />
      </section>
      <section class="main-container">
        <div class="section-header">
          <div class="title">
            Styles
            <span v-if="state.ownerFilter">
              by {{ state.ownerFilter }}
              <CloseButton aria-label="Clear the owner filter" @click="reset" />
            </span>
          </div>
          <hr />
          <ul v-if="state.styles.length > 1" class="sort-options">
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
        <div v-if="state.isLoading" class="style-grid">
          <StyleCardSkeleton v-for="i in state.pagination.page * 16" :key="i" />
        </div>
        <div v-if="!state.isLoading && state.styles.length" class="style-grid">
          <StyleCard v-for="style in state.styles" :key="style._id" :style-data="style" />
        </div>
        <div v-if="!state.isLoading && !state.styles.length" class="no-results">No results</div>
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
    this.getStyles().then(() => {
      window.addEventListener('scroll', this.infiniteScroll);
    });
  },
  mounted() {
    const pathname = window.location.pathname.split('/');
    if (pathname[1] === 'search') return (this.searchQuery = pathname[2]);
    const owner = pathname[1];
    if (!owner) return;
    const name = pathname[2];
    if (!name) return this.setOwnerFilter(owner);
    this.getStyle({ owner, name });
  },
  destroyed() {
    window.removeEventListener('scroll', this.infiniteScroll);
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
    reset() {
      clearTimeout(this.timeout);
      this.resetFilters();
    },
    infiniteScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight &&
        this.state.pagination.hasNextPage &&
        !this.state.isLoading
      ) {
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
    margin-left: auto;
    list-style-type: none;
    list-style-image: none;

    li {
      margin: 0 1rem;

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
