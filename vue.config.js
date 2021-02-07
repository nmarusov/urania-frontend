module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.module
      .rule("bpmn")
      .test(/\.bpmn$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end()
  },
  configureWebpack: {
    devtool: "source-map",
  },
  productionSourceMap: false,
}
