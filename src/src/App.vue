<template>
  <div id="app">
    <app-header @open-nav-link="openNavLink" />

    <div class="container">
      <Home />
    </div>

    <add-style-dialog :open="showAddStyleModal" @close="showAddStyleModal = false" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AddStyleDialog from '@/components/dialogs/AddStyleDialog.vue';
import Home from '@/views/Home.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AddStyleDialog,
    Home
  },
  data() {
    return {
      showAddStyleModal: false
    };
  },
  methods: {
    openNavLink(navLink) {
      this[navLink] = true;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>

<style scoped lang="scss">
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
</style>
