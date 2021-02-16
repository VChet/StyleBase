<template>
  <main v-if="user" class="profile">
    <div class="container">
      <section class="wrapper">
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
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      stats: 'user/getStats'
    })
  },
  watch: {
    user(user) {
      if (user) this.getStats(this.user);
    }
  },
  methods: {
    ...mapActions({
      getStats: 'user/getStats'
    })
  }
};
</script>

<style scoped lang="scss">
.profile {
  margin: 2rem 0;

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 5rem;

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
}
</style>
