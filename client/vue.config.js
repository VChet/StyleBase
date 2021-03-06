const path = require('path');

module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/mixins/media";`
      }
    }
  },

  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((args) => {
        args.compilerOptions.whitespace = 'preserve';
      });
  },

  devServer: {
    proxy: {
      '^/api': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      },
      '^/login': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      },
      '^/logout': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      },
      '^/rss': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      }
    }
  },

  outputDir: path.resolve(__dirname, '../public')
};
