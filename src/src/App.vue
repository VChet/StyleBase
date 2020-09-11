<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="logo">stylebase</div>

        <div class="search-container">
          <label for="search" class="visually-hidden">Style search</label>
          <input id="search" type="text" placeholder="Search..." />
        </div>

        <nav>
          <button class="link" @click="showAddStyleModal = true">add style</button>
        </nav>
      </div>
    </header>

    <div class="container">
      <Home />
    </div>

    <base-dialog size="medium" :open="showAddStyleModal" @close="showAddStyleModal = false">
      <template #body>
        <div class="new-style-dialog">
          <div class="dialog-title">Here come another style...</div>

          <div class="dialog-input">
            <input v-model="newStyleUrl" type="text" placeholder="Link to repository" />
            <div v-if="errors.submitStyle">{{ errors.submitStyle }}</div>
          </div>

          <div class="dialog-buttons">
            <button class="style-button" @click="showAddStyleModal = false">Not now</button>
            <button class="style-button-filled" @click="submitStyle(newStyleUrl)">Add</button>
          </div>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Home from './views/Home.vue';
import BaseDialog from '@/components/BaseDialog';

export default {
  name: 'App',
  components: {
    Home,
    BaseDialog
  },
  data() {
    return {
      showAddStyleModal: false,

      newStyleUrl: '',

      errors: {
        submitStyle: ''
      }
    };
  },
  methods: {
    submitStyle(url) {
      axios
        .post('/api/style/add', {
          url
        })
        .then(response => {
          console.log(response);
          this.showAddStyleModal = false;
          this.newStyleUrl = '';
        })
        .catch(error => {
          this.errors.submitStyle = error.response.data.error;
        });
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/main.scss';
@import '@/styles/mixins/media.scss';

@font-face {
  font-family: Gilroy;
  font-weight: normal;
  font-style: normal;
  src: url('./styles/fonts/Gilroy-Regular.woff2') format('woff2'),
    url('./styles/fonts/Gilroy-Regular.woff') format('woff');
}
@font-face {
  font-family: Gilroy;
  font-weight: bold;
  font-style: normal;
  src: url('./styles/fonts/Gilroy-Bold.woff2') format('woff2'), url('./styles/fonts/Gilroy-Bold.woff') format('woff');
}

#app,
::placeholder {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Gilroy;
  font-size: 16px;
  color: #47525e;
}

.container {
  margin: auto;
  max-width: 80%;
  padding-top: 10px;

  @include media-size-tablet {
    max-width: 90%;
  }

  @include media-size-mobile {
    max-width: 95%;
  }
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #272727;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;

    .logo {
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
    }

    .search-container {
      display: flex;
      flex: 0 0 50%;
      margin: 0 1rem;

      input {
        width: 100%;
        height: 40px;
        border: 1px solid #8492a6;
        border-radius: 5px;
        font-size: 18px;
        padding-left: 18px;
      }

      @include media-size-mobile {
        display: none;
      }
    }
  }

  nav button {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}

.new-style-dialog {
  width: 100%;
}

.dialog-title {
  font-size: 30px;
  margin-bottom: 2rem;
  text-align: center;
}

.dialog-input {
  text-align: center;
  margin-bottom: 1.5rem;

  input {
    border: 1px solid #d37b53;
    height: 50px;
    border-radius: 5px;
    width: 264px;
    font-size: 18px;
    padding: 0 15px 0 15px;
  }
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;

  button {
    width: 170px;
    height: 50px;
    font-size: 18px;
  }
}
</style>
