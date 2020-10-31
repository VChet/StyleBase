<template>
  <div class="style-card-skeleton"></div>
</template>

<script>
export default {
  name: 'StyleCardSkeleton'
};
</script>

<style scoped lang="scss">
.style-card-skeleton {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
  height: 300px;

  background-image: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(lightgray 200px, transparent 0), linear-gradient(lightgray 20px, transparent 0),
    linear-gradient(lightgray 10px, transparent 0), linear-gradient(lightgray 10px, transparent 0),
    linear-gradient(lightgray 10px, transparent 0);

  background-repeat: no-repeat;
  background-size: 100px 100%, 100% 200px, calc(100% - 2rem) 1rem, calc(50% - 2rem) 1rem, 25% 1rem, 40% 1rem;
  background-position: 0 0, 0 0, 1rem 220px, 1rem 240px, 1rem calc(300px - 1.5rem), 90% calc(300px - 1.5rem);

  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    background-position: 0 100%, 0 0, 1rem 220px, 1rem 240px, 1rem calc(300px - 1.5rem), 90% calc(300px - 1.5rem);
  }

  50% {
    background-position: 100% 0, 0 0, 1rem 220px, 1rem 240px, 1rem calc(300px - 1.5rem), 90% calc(300px - 1.5rem);
  }

  100% {
    background-position: 0 100%, 0 0, 1rem 220px, 1rem 240px, 1rem calc(300px - 1.5rem), 90% calc(300px - 1.5rem);
  }
}
</style>
