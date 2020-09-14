<template>
  <div class="style-card">
    <div class="image-container">
      <img v-if="preview" :src="preview" :alt="`Preview of ${name} style`" />
      <a class="button style-button-filled" :href="usercss" rel="noopener" target="_blank">Install</a>
    </div>

    <div class="data" @click="$emit('open', _id)">
      <div class="name">{{ name }}</div>
      <div>by {{ owner }}</div>
      <div class="footer">
        <span>{{ stargazers }} stars</span>
        <span>updated {{ dateFromNow }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
    owner: {
      type: String,
      required: true,
      default: 'Author'
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
  },
  computed: {
    dateFromNow() {
      dayjs.extend(relativeTime);
      return dayjs(this.lastUpdate).fromNow();
    }
  }
};
</script>

<style scoped lang="scss">
.style-card {
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
  margin: 2rem;
  width: 260px;
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
