<template>
  <div class="style-card">
    <div class="image-container">
      <img v-if="preview" :src="preview" :alt="`Preview of ${name} style`" />
      <a class="style-button-filled" :href="usercss" rel="noopener" target="_blank">Install</a>
    </div>

    <div class="card-data" @click="$emit('open', _id)">
      <span class="data-name">{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleCard',
  props: {
    _id: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: 'Some awesome style'
    },
    usercss: {
      type: String,
      required: true,
      default: ''
    },
    preview: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.style-card {
  position: relative;
  flex: 1 1 auto;
  margin: 2rem;
  width: 260px;

  &:hover,
  &:focus-within {
    img {
      opacity: 0.5;
    }

    a {
      opacity: 1;
    }
  }
}

.image-container {
  background-color: #f5e6cc;
  height: 200px;
  position: relative;

  img {
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

.card-no-image {
  background-color: #e0e6ed;
}

.card-data {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 80px;
  cursor: pointer;
}

.data-name {
  font-size: 20px;
  color: #47525e;
}
</style>
