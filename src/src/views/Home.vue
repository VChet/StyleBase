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
    <section class="main-container">
      <div class="section-header">
        <div class="title">Styles</div>
        <hr />
        <ul class="sort-options">
          <li>
            <button
              type="button"
              class="link"
              :class="{ active: selectedOption === 0 }"
              @click="selectedOption = 0"
            >Recently added</button>
          </li>
          <li>
            <button
              type="button"
              class="link"
              :class="{ active: selectedOption === 1 }"
              @click="selectedOption = 1"
            >Recently updated</button>
          </li>
          <li>
            <button
              type="button"
              class="link"
              :class="{ active: selectedOption === 2 }"
              @click="selectedOption = 2"
            >Most liked</button>
          </li>
        </ul>
      </div>
      <div class="style-grid">
        <style-card
          v-for="style in styles"
          :key="style._id"
          v-bind="style"
          @open="onOpenStyleCard"
        />
      </div>
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

export default {
  name: 'Home',
  components: {
    StyleCard,
    StyleInfoDialog
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
      this.selectedStyle = this.styles.find(style => style._id === _id);
    }
  }
};
</script>

<style scoped lang="scss">
.main-container {
  margin-bottom: 1rem;
}

.features {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 3rem 0;
  user-select: none;
  border: 2px solid #f0f0f0;

  .feature-item {
    padding: 1.5rem;

    &:not(:first-of-type) {
      border-left: 2px solid #f0f0f0;
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
      border-left: 2px solid #f0f0f0;
    }
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
    background-color: #ebebeb;
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
        color: #47525e;

        &.active {
          color: #d37b53;
          border-color: #d37b53;
        }

        &:focus {
          color: #d37b53;
          border-color: orange;
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
</style>
