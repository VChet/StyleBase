<template>
  <BaseDialog size="medium">
    <h1 class="dialog-title">StyleBase is closing</h1>
    <h2>What happened?</h2>
    <p>
      StyleBase came out at a time when there was no way to easily share userstyles. The only option was to use
      userstyles.org, but long loading times made its use almost impossible.
    </p>
    <p>
      After this year, the site has 138 styles and about 80 registered users, but, unfortunately, I expected that during
      this time I would receive more feedback and, perhaps, there will be people interested in the development of
      StyleBase. As it turned out, there were no such people at all, which left me unmotivated to continue this project
      on my own and paying hosting expenses.
    </p>
    <p class="highlight">StyleBase will be shut down at the end of September.</p>
    <h2>What's next?</h2>
    <p>
      As an alternative you may try <a href="https://userstyles.world" rel="noopener">userstyles.world</a>. It is much
      like StyleBase, except you need to complete a registration in order to add an userstyle.
    </p>
    <p>
      If someone wants to get all links to userstyles you may use
      <a href="/api/usercssFiles">this endpoint</a>
    </p>
    <div class="dialog-buttons">
      <button class="style-button-filled" type="button" @click="$router.back()">Close</button>
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog.vue';

export default {
  name: 'Announcement',
  components: {
    BaseDialog
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: underline;
}

p {
  line-height: 24px;
}

.highlight {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}

.dialog-title {
  font-size: 30px;
  margin-bottom: 1rem;
  text-align: center;
}

.dialog-buttons {
  margin-top: 2rem;
  text-align: center;
}
</style>
