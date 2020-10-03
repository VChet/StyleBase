<template>
  <div id="app">
    <app-header @open-nav-link="openNavLink" />
    <Home />
    <app-footer />

    <how-to-use-dialog :open="showHowtoUseModal" @close="showHowtoUseModal = false" />
    <add-style-dialog :open="showAddStyleModal" @close="showAddStyleModal = false" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import Home from '@/views/Home.vue';
import AppFooter from '@/components/AppFooter.vue';
import HowToUseDialog from '@/components/dialogs/HowToUseDialog.vue';
import AddStyleDialog from '@/components/dialogs/AddStyleDialog.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Home,
    AppFooter,
    HowToUseDialog,
    AddStyleDialog
  },
  data() {
    return {
      showHowtoUseModal: false,
      showAddStyleModal: false
    };
  },
  mounted() {
    this.$gtag.pageview({
      page_path: '/'
    });
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
