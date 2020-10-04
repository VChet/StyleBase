<template>
  <div class="style-card">
    <div class="image-container">
      <img v-if="preview" :src="preview" :alt="`Preview of ${name} style`" />
      <a class="button style-button-filled" :href="usercss" rel="noopener" target="_blank">Install</a>
    </div>

    <div class="data" @click="$emit('open', { owner, name })">
      <div class="name">{{ name.replace(/-/g, ' ') }}</div>
      <div>by {{ owner }}</div>
      <div class="footer">
        <span>{{ pluralize(stargazers, 'star') }}</span>
        <span>updated {{ dateFromNow(lastUpdate) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { styleInfoMixin } from '@/mixins';

export default {
  name: 'StyleCard',
  mixins: [styleInfoMixin],
  props: {
    // eslint-disable-next-line vue/prop-name-casing
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
    owner: {
      type: String,
      required: true,
      default: 'Owner'
    },
    stargazers: {
      type: Number,
      required: false,
      default: 0
    },
    lastUpdate: {
      type: String,
      required: false,
      default: ''
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
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
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

.data {
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: 1rem;
  background-color: #fff;
  cursor: pointer;

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

  .footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
