<template>
  <base-card>
    <template #image>
      <div class="skeleton-image"></div>
    </template>

    <template #data>
      <div class="skeleton-data">
        <div class="name"></div>
        <div class="owner"></div>
      </div>
    </template>

    <template #footer>
      <div class="skeleton-footer">
        <span class="stars"></span>
        <span class="date"></span>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';

export default {
  name: 'StyleCardSkeleton',
  components: {
    BaseCard
  }
};
</script>

<style scoped lang="scss">
.skeleton-image,
.skeleton-data > *,
.skeleton-footer > * {
  position: relative;
  height: 14px;
  background-color: #dfdfdf;
  border-radius: 8px;

  &:after {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    transform: translateX(-70%);
    background-image: linear-gradient(90deg, transparent 30%, #ffffff4d 50%, transparent 70%);
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    to {
      transform: translateX(70%);
    }
  }
}

.skeleton-image {
  height: 100%;
  width: 100%;
}

.skeleton-data {
  height: 100%;

  .name {
    width: 80%;
    height: 20px;
    margin-bottom: 4px;
  }

  .owner {
    width: 50%;
  }
}

.skeleton-footer {
  display: flex;
  width: 100%;

  .stars {
    width: 20%;
  }

  .date {
    width: 55%;
    margin-left: auto;
  }
}
</style>
