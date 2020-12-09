<template>
  <div id="app">
    <AppHeader @open-nav-link="openNavLink" />
    <Home />
    <AppFooter @open-nav-link="openNavLink" />

    <Alert />
    <HowToUseDialog :open="showHowtoUseModal" @close="showHowtoUseModal = false" />
    <AddStyleDialog :open="showAddStyleModal" @close="showAddStyleModal = false" />
    <LoginDialog :open="showLoginModal" @close="showLoginModal = false" />
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
import LoginDialog from '@/components/dialogs/LoginDialog.vue';
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
    LoginDialog,
    PrivacyPolicyDialog
  },
  data() {
    return {
      showHowtoUseModal: false,
      showAddStyleModal: false,
      showLoginModal: false,
      showPrivacyModal: false
    };
  },
  computed: {
    haveActiveModal() {
      return this.showHowtoUseModal || this.showAddStyleModal || this.showLoginModal || this.showPrivacyModal;
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
    if (process.env.NODE_ENV === 'production') {
      // Google Analytics
      this.$gtag.pageview({ page_path: window.location.pathname });
      // Cloudflare Analytics
      const CFAnalytics = document.createElement('script');
      CFAnalytics.setAttribute('defer', '');
      CFAnalytics.setAttribute('src', 'https://static.cloudflareinsights.com/beacon.min.js');
      CFAnalytics.setAttribute('data-cf-beacon', `{"token": "${process.env.VUE_APP_CLOUDFLARE_TOKEN}"}`);
      document.body.appendChild(CFAnalytics);
    }
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
