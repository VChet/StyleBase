module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/styles/mixins/media";
        `
      }
    }
  },

  devServer: {
    proxy: {
      '^/api': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      }
    }
  }
};
