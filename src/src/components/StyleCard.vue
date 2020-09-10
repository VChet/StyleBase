<template>
  <div class="style-card">
    <div class="card-image" @mouseover="showInstallBlock = true" @mouseleave="showInstallBlock = false">
      <img v-if="preview" width="260px" height="152px" :src="preview" />
      <div v-if="showInstallBlock" class="install">
        <button @click="$emit('open', _id)">Install</button>
      </div>
    </div>

    <div class="card-data">
      <div class="data-name">
        {{ name }}
      </div>
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
    preview: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      showInstallBlock: false
    };
  }
};
</script>

<style scoped lang="scss">
.style-card {
  height: 240px;
  width: 260px;
}

.card-image {
  height: 152px;
  border: 2px solid #c0ccda;
  position: relative;

  &:hover {
    background-color: rgba(245, 230, 204, 0.75);
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
  height: 88px;
}

.data-name {
  font-size: 20px;
  color: #47525e;
}

.install {
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  button {
    border: 1px solid #d37b53;
    background-color: #d37b53;
    border-radius: 5px;
    width: 169px;
    height: 50px;

    color: #ffffff;
    font-size: 18px;
  }
}
</style>
