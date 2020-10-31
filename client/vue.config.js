const path = require('path');

const redirectUrl = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;

module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/mixins/media";`
      }
    }
  },

  devServer: {
    proxy: {
      '^/api': { target: redirectUrl },
      '^/login': { target: redirectUrl },
      '^/logout': { target: redirectUrl },
      '^/rss': { target: redirectUrl }
    }
  },

  outputDir: path.resolve(__dirname, '../public')
};
