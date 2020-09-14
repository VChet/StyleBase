<template>
  <div id="app">
    <app-header @open-nav-link="openNavLink" />

    <div class="container">
      <Home />
    </div>

    <how-to-use-dialog :open="showHowtoUseModal" @close="showHowtoUseModal = false" />
    <add-style-dialog :open="showAddStyleModal" @close="showAddStyleModal = false" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import HowToUseDialog from '@/components/dialogs/HowToUseDialog.vue';
import AddStyleDialog from '@/components/dialogs/AddStyleDialog.vue';
import Home from '@/views/Home.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    HowToUseDialog,
    AddStyleDialog,
    Home
  },
  data() {
    return {
      showHowtoUseModal: false,
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
