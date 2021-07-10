<template>
  <div id="app">
    <AppHeader @open-nav-link="openNavLink" />
    <router-view />
    <AppFooter @open-nav-link="openNavLink" />

    <Alert />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Alert from '@/components/dialogs/Alert.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Alert
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
