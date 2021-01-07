module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

  pwa: {
    name: 'vmc',
    workboxOptions: {
      navigateFallback: '/index.html',
      skipWaiting: true,
    }
  }
}
