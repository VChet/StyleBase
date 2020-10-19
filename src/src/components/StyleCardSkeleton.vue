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
.style-card {
  animation: shine 1s infinite alternate;
}

.skeleton-image {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(lightgray 200px, transparent 0);
  background-size: 100% 200px;
}

.skeleton-data {
  height: 100%;

  .name {
    height: 20px;
    margin-bottom: 10px;
    background: lightgray;
  }

  .owner {
    height: 10px;
    width: 50%;
    background: lightgray;
  }
}

.skeleton-footer {
  display: flex;
  width: 100%;

  .stars {
    height: 10px;
    width: 30%;
    background: lightgray;
  }

  .date {
    height: 10px;
    width: 50%;
    background: lightgray;
    margin-left: auto;
  }
}

@keyframes shine {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.4;
  }
}
</style>
