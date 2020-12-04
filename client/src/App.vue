<template>
  <div id="app">
    <AppHeader @open-nav-link="openNavLink" />
    <Home />
    <AppFooter @open-nav-link="openNavLink" />

    <Alert />
    <HowToUseDialog :open="showHowtoUseModal" @close="showHowtoUseModal = false" />
    <AddStyleDialog :open="showAddStyleModal" @close="showAddStyleModal = false" />
    <PrivacyPolicyDialog :open="showPrivacyModal" @close="showPrivacyModal = false" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import AppHeader from '@/components/AppHeader.vue';
import Home from '@/views/Home.vue';
import AppFooter from '@/components/AppFooter.vue';
import Alert from '@/components/dialogs/Alert.vue';
import HowToUseDialog from '@/components/dialogs/HowToUseDialog.vue';
import AddStyleDialog from '@/components/dialogs/AddStyleDialog.vue';
import PrivacyPolicyDialog from '@/components/dialogs/PrivacyPolicyDialog.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Home,
    AppFooter,
    Alert,
    HowToUseDialog,
    AddStyleDialog,
    PrivacyPolicyDialog
  },
  data() {
    return {
      showHowtoUseModal: false,
      showAddStyleModal: false,
      showPrivacyModal: false
    };
  },
  computed: {
    haveActiveModal() {
      return this.showHowtoUseModal || this.showAddStyleModal || this.showPrivacyModal;
    }
  },
  watch: {
    haveActiveModal(isActive) {
      const $body = document.body;
      isActive ? $body.classList.add('no-scroll') : $body.classList.remove('no-scroll');
    }
  },
  created() {
    this.getUser();
  },
  mounted() {
    this.$gtag.pageview({ page_path: window.location.pathname });
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser'
    }),
    openNavLink(navLink) {
      this[navLink] = true;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>
