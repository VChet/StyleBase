<template>
  <section class="Home">
    <section class="content-section">
      <div class="section-header">
        Popular
      </div>
      <div class="section-content">
        <style-card v-for="style in popularStyles" :key="style._id" v-bind="style" @open="onOpenStyleCard" />
      </div>
    </section>

    <section class="content-section">
      <div class="section-header">
        Recently updated
      </div>
      <div class="section-content">
        <style-card v-for="style in recentlyUpdatedStyles" :key="style._id" v-bind="style" @open="onOpenStyleCard" />
      </div>
    </section>

    <section class="content-section">
      <div class="section-header">
        Recently added
      </div>
      <div class="section-content">
        <style-card v-for="style in recentlyAddedStyles" :key="style._id" v-bind="style" @open="onOpenStyleCard" />
      </div>
    </section>

    <base-dialog
      size="extra-large"
      :open="showStyleInfoModal"
      @close="
        showStyleInfoModal = false
        selectedStyle = {}
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
              <a class="style-button" :href="selectedStyle.url">Repository</a>
              <a class="style-button-filled">Install</a>
            </div>
          </div>
        </div>
      </template>
    </base-dialog>
  </section>
</template>

<script>
import axios from 'axios'
import StyleCard from '@/components/StyleCard'
import BaseDialog from '@/components/BaseDialog'

export default {
  name: 'Home',
  components: {
    StyleCard,
    BaseDialog
  },
  data() {
    return {
      popularStyles: [],
      recentlyUpdatedStyles: [],
      recentlyAddedStyles: [],

      selectedStyle: {},

      showStyleInfoModal: false
    }
  },
  created() {
    axios
      .get('/api/styles', {
        params: {
          sort: 'stars'
        }
      })
      .then(response => {
        this.popularStyles = response.data.styles.slice(0, 4)
      })
      .catch(error => {
        console.error(error)
      })

    axios
      .get('/api/styles', {
        params: {
          sort: 'update'
        }
      })
      .then(response => {
        this.recentlyUpdatedStyles = response.data.styles.slice(0, 4)
      })
      .catch(error => {
        console.error(error)
      })

    axios
      .get('/api/styles')
      .then(response => {
        this.recentlyAddedStyles = response.data.styles.slice(0, 4)
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    onOpenStyleCard(_id) {
      this.showStyleInfoModal = true

      axios
        .get(`/api/style/${_id}`)
        .then(styleData => {
          this.selectedStyle = styleData.data.style
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.content-section {
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  background-color: #f5e6cc;
  height: 38px;
  font-size: 22px;
  color: #47525e;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  a:last-child {
    margin-right: 0;
  }
}
</style>
