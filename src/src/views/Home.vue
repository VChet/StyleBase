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
</style>
