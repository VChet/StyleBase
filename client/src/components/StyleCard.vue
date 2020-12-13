<template>
  <BaseCard>
    <template #image>
      <img
        v-if="styleData.customPreview || styleData.preview"
        :src="styleData.customPreview || styleData.preview"
        :alt="`Preview of ${styleData.customName || styleData.name} style`"
      />
      <img v-else class="no-image" src="@/images/no-image.png" alt="No preview" />
      <a
        class="button style-button-filled"
        type="button"
        :href="styleData.usercss"
        rel="noopener"
        target="_blank"
        @click="$gtag.event('install', { event_category: 'stylecard' })"
      >
        Install
      </a>
    </template>

    <template #data>
      <div @click="openStyleModal(styleData)">
        <div class="name">{{ styleData.customName || removeDashes(styleData.name) }}</div>
        <div>by {{ styleData.owner.login }}</div>
      </div>
    </template>

    <template #footer>
      <span>{{ pluralize(styleData.stargazers, 'star') }}</span>
      <span>updated {{ dateFromNow(styleData.lastUpdate) }}</span>
    </template>
  </BaseCard>
</template>

<script>
import { mapActions } from 'vuex';

import { styleInfoMixin } from '@/mixins';
import BaseCard from '@/components/BaseCard.vue';

export default {
  name: 'StyleCard',
  components: {
    BaseCard
  },
  mixins: [styleInfoMixin],
  props: {
    styleData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    ...mapActions({
      openStyleModal: 'styleGrid/openStyleModal'
    })
  }
};
</script>

<style scoped lang="scss">
.style-card {
  transition: transform 0.2s;

  &:hover,
  &:focus-within {
    transform: translateY(-4px);

    img {
      opacity: 0.5;
    }

    a {
      opacity: 1;
    }
  }
}

.image-container {
  img:not(.no-image) {
    width: 100%;
    height: inherit;
    object-fit: cover;
    transition: opacity 0.2s;
  }

  a {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 30px;
    padding: 5px 0;
    font-size: 18px;
    transition: background-color 0.2s, opacity 0.2s;

    &:focus {
      opacity: 1;
    }
  }
}

.data {
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: bold;
    transition: color 0.2s;
  }

  &:hover .name,
  &:focus .name {
    color: var(--color-main);
  }
}
</style>
