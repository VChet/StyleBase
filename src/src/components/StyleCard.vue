<template>
  <div class="style-card">
    <div class="image-container">
      <img v-if="preview" :src="preview" :alt="`Preview of ${name} style`" />
      <!-- FIXME: make selectable via tab button -->
      <a class="style-button-filled" :href="usercss" target="_blank">Install</a>
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
  height: 240px;
  width: 260px;
  position: relative;

  &:hover {
    img {
      opacity: 0.5;
    }

    a {
      visibility: visible;
    }
  }
}

.image-container {
  background-color: #f5e6cc;
  height: 150px;
  position: relative;

  img {
    width: 100%;
    height: inherit;
    object-fit: cover;
  }

  a {
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 30px;
    padding: 5px 0;
    font-size: 18px;
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
