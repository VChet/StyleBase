const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const emoji = require('node-emoji');
const emojiFallback = require('@/githubEmoji.json');

const styleInfoMixin = {
  methods: {
    pluralize(num, noun, suffix = 's') {
      return `${num} ${noun}${num === 1 ? '' : suffix}`;
    },
    removeDashes(text) {
      return text.replace(/[-_]/g, ' ');
    },
    dateFromNow(date) {
      dayjs.extend(relativeTime);
      return dayjs(date).fromNow();
    },
    parseEmoji(text) {
      const onMissing = (name) => {
        const url = emojiFallback[name];
        if (!url) return '';
        return `<img class="emoji" src="${url}.png" alt="${name}" />`;
      };
      return emoji.emojify(text, onMissing);
    }
  }
};

module.exports = { styleInfoMixin };