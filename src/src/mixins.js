const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const emoji = require('node-emoji');
const emojiFallback = require('@/githubEmoji.json');

const styleInfoMixin = {
  methods: {
    pluralize(num, noun, suffix = 's') {
      return `${num} ${noun}${num === 1 ? '' : suffix}`;
    },
    dateFromNow(date) {
      dayjs.extend(relativeTime);
      return dayjs(date).fromNow();
    },
    parseEmoji(text) {
      const onMissing = (name) => {
        return `<img class="emoji" src="${emojiFallback[name]}.png" alt="${name}" />`;
      };
      return emoji.emojify(text, onMissing);
    }
  }
};

module.exports = { styleInfoMixin };
