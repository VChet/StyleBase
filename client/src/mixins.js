import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { emojify } from 'node-emoji';

import emojiFallback from '@/githubEmoji.json';

dayjs.extend(relativeTime);

export default {
  methods: {
    compressImage(url) {
      url = url.replace(/^https?:\/\//i, '');
      return `https://images.weserv.nl/?url=${url}&w=300&h=300&q=60`;
    },
    pluralize(num, noun, suffix = 's') {
      return `${num} ${noun}${num === 1 ? '' : suffix}`;
    },
    dateFromNow(date) {
      return dayjs(date).fromNow();
    },
    parseEmoji(text) {
      const onMissing = (name) => {
        const url = emojiFallback[name];
        if (!url) return '';
        return `<img class="emoji" src="${url}.png" alt="${name}" />`;
      };
      return emojify(text, onMissing);
    }
  }
};
