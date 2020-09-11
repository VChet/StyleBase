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
          <div class="style-info-title">
            <div>{{ selectedStyle.name }}</div>
            <div>Updated: {{ selectedStyle.lastUpdate }}</div>
          </div>

          <div class="style-info-image">
            <img v-if="selectedStyle.preview" :style="{ maxWidth: '100%' }" :src="selectedStyle.preview" />
            <div v-else :style="{ backgroundColor: '#C0CCDA', height: '500px' }"></div>
          </div>

          <div class="style-info-footer">
            <div class="info-footer-metrics">
              <div>
                <div>{{ selectedStyle.stargazers }} stars</div>

                <div>{{ selectedStyle.forks }} forks</div>
              </div>

              <div>
                <div>{{ selectedStyle.issues }} issues</div>

                <div>{{ selectedStyle.watchers }} watchers</div>
              </div>
            </div>

            <div class="info-footer-buttons">
              <a class="style-button" :href="selectedStyle.url" rel="noopener" target="_blank">Repository</a>
              <a class="style-button-filled" :href="selectedStyle.usercss" rel="noopener" target="_blank">Install</a>
            </div>
          </div>
        </div>
      </template>
    </base-dialog>
  </section>
</template>

<script>
import axios from 'axios';
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
  color: #47525e;
  padding-left: 0.5rem;
  margin-bottom: 2rem;
}

.style-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -2rem;
}

.style-info-title {
  display: flex;
  align-items: center;
  background-color: #f5e6cc;
  margin-bottom: 24px;
  padding: 1rem;

  & div {
    color: #47525e;
  }

  div:nth-child(1) {
    font-size: 34px;
  }

  div:last-child {
    margin-left: auto;
  }
}

.style-info-image {
  margin-bottom: 1.5rem;
}

.style-info-footer {
  margin-bottom: 2rem;
}

.info-footer-metrics {
  display: flex;
  flex: 1 0 0;
  color: #47525e;
  font-size: 30px;

  div {
    flex: 0 0 25%;
  }
}

.style-info-footer {
  display: flex;
}

.info-footer-buttons {
  margin-left: auto;

  a {
    margin-right: 27px;
    width: 175px;
    height: 50px;
  }

  a:last-child {
    margin-right: 0;
  }
}
</style>
