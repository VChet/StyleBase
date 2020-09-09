module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development'
  },

  devServer: {
    proxy: {
      '^/api': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      }
    }
  }
}
