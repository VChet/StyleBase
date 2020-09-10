<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-logo">
        style base
      </div>

      <div class="nav-search">
        <input class="search-input" type="text" placeholder="Search..." />
      </div>

      <div class="nav-buttons">
        <button @click="showAddStyleModal = true">Add style</button>
        <button>About</button>
      </div>
    </nav>

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
@import './styles/main.scss';

#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #faf6f0;
}

.container {
  margin: auto;
  max-width: 80%;
  padding-top: 10px;
}

.nav {
  background-color: #272727;
  padding: 12px 20px 12px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.nav-logo {
  color: #ffffff;
  font-size: 32px;
}

.nav-search {
  flex: 0 0 50%;
  display: flex;
}

.search-input {
  height: 100%;
  width: 100%;
  border: 1px solid #8492a6;
  border-radius: 5px;
  height: 41px;
  font-size: 18px;
  padding-left: 18px;
}

.nav-buttons button {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
}

.new-style-dialog {
  width: 100%;
}

.dialog-title {
  color: #47525e;
  font-size: 31px;
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
