<template>
  <div class="style-card">
    <div class="image-container">
      <slot name="image"></slot>
    </div>

    <div class="data">
      <slot name="data"></slot>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard'
};
</script>

<style scoped lang="scss">
.style-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: var(--color-bg-light);
}

.data {
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: 1rem;
  background-color: var(--color-text-bg);
  cursor: pointer;

  .footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
