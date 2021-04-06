<template>
  <main v-if="user">
    <div class="container">
      <section class="profile">
        <div>
          <h1 class="username">{{ user.username }}</h1>
          <div v-if="stats" class="stats">
            <div>Styles: {{ stats.totalStyles }}</div>
            <div>Stargazers: {{ stats.totalStargazers }}</div>
          </div>
        </div>
        <div class="connected-accounts">
          <div class="title">Connected Accounts:</div>
          <div class="provider">
            <img class="icon invert" src="@/images/github-logo.png" alt="GitHub logo" />
            <div v-if="user.githubId" class="name">GitHub ✔️</div>
            <a v-else href="/login/github">Connect GitHub Account</a>
          </div>
          <div class="provider">
            <img class="icon" src="@/images/codeberg-logo.png" alt="Codeberg logo" />
            <div v-if="user.codebergId" class="name">Codeberg ✔️</div>
            <a v-else href="/login/codeberg">Connect Codeberg Account</a>
          </div>
        </div>
        <div v-if="user.orgs && user.orgs.length" class="organizations">
          <div class="title">Organizations:</div>
          {{ user.orgs.map((org) => org.name).join(', ') }}
        </div>
      </section>
      <section v-if="stylesState.styles.length" class="styles">
        <div class="section-header">
          <div class="title">Styles</div>
          <hr />
        </div>
        <div class="style-grid">
          <StyleEditor v-for="style in stylesState.styles" :key="style._id" :style-data="style" />
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import StyleEditor from '@/components/StyleEditor.vue';

export default {
  name: 'Profile',
  components: {
    StyleEditor
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      stats: 'user/getStats',
      stylesState: 'styleGrid/getState'
    })
  },
  watch: {
    user() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      getStats: 'user/getStats',
      setOwnerFilter: 'styleGrid/setOwnerFilter'
    }),
    fetchData() {
      if (this.user) {
        this.getStats(this.user);
        this.setOwnerFilter(this.user.username);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 5rem;
  margin: 2rem 0;

  .title {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .username {
    margin: 0 0 1rem;
  }
  .connected-accounts {
    .provider {
      display: flex;
      align-items: center;
      + .provider {
        margin-top: 0.5rem;
      }
      .name,
      a {
        display: flex;
        align-items: center;
      }
      a {
        text-decoration: underline;
      }
      .icon {
        max-height: 1.5rem;
        margin-right: 0.75rem;
      }
    }
  }
}
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  @include media-size-mobile {
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  hr {
    flex-grow: 1;
    height: 2px;
    margin: 0 1.5rem;
    border: none;
    background-color: var(--color-border);
  }
}
.style-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
