<template>
  <section class="topics">
    <ul class="list">
      <li v-for="(topic, index) in topics" :key="index">
        <button class="link" type="button" @click="setQuery(topic.name)">{{ topic.name }}</button>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'TopicCloud',
  data() {
    return {
      topics: []
    };
  },
  created() {
    axios.get('/api/topics').then(({ data }) => {
      this.topics = data.topics;
    });
  },
  methods: {
    ...mapActions({
      setQuery: 'styleGrid/setQuery'
    })
  }
};
</script>

<style scoped lang="scss">
.topics {
  margin: 1rem auto;
  @include media-size-mobile {
    display: none;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem 0.5rem;
    list-style: none;
    margin: 0;
    li {
      display: inline-block;
    }
  }
}
</style>
